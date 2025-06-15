import React, { useState } from "react";

export default function PitchSubmissionForm() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: POST to Lambda endpoint
    alert("Pitch submitted! (Not yet wired to backend)");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="block mb-2 p-2 border rounded w-full" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="block mb-2 p-2 border rounded w-full" />
      <input name="organization" placeholder="Organization" value={form.organization} onChange={handleChange} className="block mb-2 p-2 border rounded w-full" />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="block mb-2 p-2 border rounded w-full" />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
    </form>
  );
}
