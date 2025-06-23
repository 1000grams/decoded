import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_URL =
  process.env.REACT_APP_AUTH_API_URL
    ? `${process.env.REACT_APP_AUTH_API_URL}/signin`
    : "/api/auth/signin";

      if (!response.ok) {
      const data = await response.json();
      window.localStorage.setItem("cognito_id_token", data.idToken);
      window.localStorage.setItem("cognito_groups", JSON.stringify(data.groups));
      setStatus("Signed in!");
      if (data.groups && data.groups.includes("artist")) {
        navigate("/dashboard");
      }
      console.error("Sign-in error", err);
      setStatus("Sign in failed");
  async function handleSubmit(e) {
    e.preventDefault();
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
