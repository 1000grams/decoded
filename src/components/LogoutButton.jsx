<<<<<<< HEAD
﻿import React from 'react';
=======
import React from 'react';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

const LogoutButton = () => {
  const clientId = "5pb29tja8gkqm3jb43oimd5qjt";
  const logoutUri = "https://decodedmusic.com/buzz";

  const handleLogout = () => {
    window.location.href = `https://auth.decodedmusic.com/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
