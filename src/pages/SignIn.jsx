import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_URL =
  process.env.REACT_APP_AUTH_API_URL
    ? `${process.env.REACT_APP_AUTH_API_URL}/signin`
    : "/api/auth/signin";

const CHECK_URL = process.env.REACT_APP_COGNITO_CHECK_URL;

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Signing in...");
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.idToken) {
          window.localStorage.setItem("cognito_id_token", data.idToken);
        }
        navigate("/dashboard");
      } else {
        throw new Error(data.message || "Sign in failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("Sign in failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="block mb-3 p-2 border rounded w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="block mb-3 p-2 border rounded w-full"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
      {status && <div className="mt-3">{status}</div>}
    </form>
  );
}
