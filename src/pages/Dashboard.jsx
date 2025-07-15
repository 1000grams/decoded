import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton.jsx';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("https://decodedmusic.com/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("authToken", data.access_token);
          window.location.replace("/dashboard");
        });
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      window.location.href = '/login';
    } else {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch("https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setApiResponse(data);
          if (data.email) setUserEmail(data.email);
        })
        .catch((err) => {
          console.error("Token may be invalid", err);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  if (!token) return <p>Loading token...</p>;

  return (
    <div className="dashboard">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <h2>Welcome to your dashboard</h2>
      {userEmail && <p>Logged in as: {userEmail}</p>}
      {apiResponse && (
        <div>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
