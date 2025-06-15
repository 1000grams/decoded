import React, { useState } from "react";
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setStatus("Thank you! We'll be in touch soon.");
    } else {
      setStatus("There was an error sending your message.");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 border rounded bg-white shadow">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="block mb-3 p-2 border rounded w-full"
        required
      />
      <input
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="block mb-3 p-2 border rounded w-full"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        className="block mb-3 p-2 border rounded w-full"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      {status && <div className="mt-3">{status}</div>}
    </form>
  );
}
