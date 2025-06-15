import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          Service Provided by <a href="https://DecodedMusic.com" className="underline" target="_blank" rel="noopener noreferrer">DecodedMusic.com</a> | AHA LLC
          <br />
          Contact: <a href="mailto:ops@decodedmusic.com" className="underline">ops@decodedmusic.com</a>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="/about" className="underline">About Us</a>
          <a href="/policies.html" target="_blank" rel="noopener noreferrer" className="underline">
            Terms of Service &amp; Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
