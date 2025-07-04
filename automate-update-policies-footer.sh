#!/bin/bash
# automate-update-policies-footer.sh

# 1. Create or update the policies file
mkdir -p public
cat > public/policies.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terms of Service & Privacy Policy | DecodedMusic.com</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; }
    h1, h2 { color: #1a202c; }
    h1 { margin-top: 2rem; }
    h2 { margin-top: 1.5rem; }
    section { margin-bottom: 2rem; }
    .footer-policy { font-size: 0.95em; color: #555; margin-top: 2rem; }
    a { color: #2563eb; }
  </style>
</head>
<body>
  <div class="footer-policy">
    Service Provided by DecodedMusic.com | AHA LLC<br>
    Contact: <a href="https://DecodedMusic.com">DecodedMusic.com</a> | <a href="mailto:ops@decodedmusic.com">ops@decodedmusic.com</a>
  </div>

  <h1>Terms of Service</h1>
  <div><strong>Last Updated:</strong> June 11, 2025</div>
  <section>
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using DecodedMusic.com (“Service”), you agree to be bound by these Terms of Service (“Terms”). If you do not agree, please do not use the Service.</p>
  </section>
  <section>
    <h2>2. Definitions</h2>
    <p>“User,” “you,” or “your” means any person who accesses or uses the Service.<br>
    “Content” means any information, text, graphics, or other materials you submit, post, or display through the Service.</p>
  </section>
  <section>
    <h2>3. Description of Service</h2>
    <p>DecodedMusic.com provides [brief description of what the service does]. We reserve the right to modify or discontinue, temporarily or permanently, all or part of the Service without notice.</p>
  </section>
  <section>
    <h2>4. User Obligations</h2>
    <ul>
      <li>You will not use the Service for any unlawful purpose.</li>
      <li>You will not infringe others’ intellectual property or privacy rights.</li>
      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
    </ul>
  </section>
  <section>
    <h2>5. Intellectual Property</h2>
    <p>All rights, title, and interest in and to the Service (excluding User Content) are and will remain the exclusive property of DecodedMusic.com | AHA LLC. You are granted a limited, non-exclusive, non-transferable license to use the Service in accordance with these Terms.</p>
  </section>
  <section>
    <h2>6. Termination</h2>
    <p>We may suspend or terminate your access immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, all rights granted to you will cease.</p>
  </section>
  <section>
    <h2>7. Disclaimers</h2>
    <p>The Service is provided “as-is” and “as-available.” DecodedMusic.com | AHA LLC disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.</p>
  </section>
  <section>
    <h2>8. Limitation of Liability</h2>
    <p>To the maximum extent permitted by law, in no event will DecodedMusic.com | AHA LLC be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the Service.</p>
  </section>
  <section>
    <h2>9. Indemnification</h2>
    <p>You agree to indemnify and hold harmless DecodedMusic.com | AHA LLC and its officers, directors, employees, and agents from any claims, damages, liabilities, and expenses arising from your breach of these Terms or your use of the Service.</p>
  </section>
  <section>
    <h2>10. Governing Law</h2>
    <p>These Terms and any dispute arising out of or related to them will be governed by the laws of [Jurisdiction], without regard to conflict-of-law principles.</p>
  </section>
  <section>
    <h2>11. Changes to Terms</h2>
    <p>We may revise these Terms at any time. We will post the updated Terms with a new “Last Updated” date. Continued use after changes constitutes your acceptance.</p>
  </section>
  <section>
    <h2>12. Contact</h2>
    <p>DecodedMusic.com | AHA LLC<br>
    Website: <a href="https://DecodedMusic.com">DecodedMusic.com</a><br>
    Email: <a href="mailto:ops@decodedmusic.com">ops@decodedmusic.com</a></p>
  </section>

  <h1>Privacy Policy</h1>
  <div><strong>Last Updated:</strong> June 11, 2025</div>
  <section>
    <h2>1. Introduction</h2>
    <p>DecodedMusic.com | AHA LLC (“we,” “us,” “our”) respects your privacy. This Privacy Policy explains what information we collect, how we use it, and your choices.</p>
  </section>
  <section>
    <h2>2. Information We Collect</h2>
    <ul>
      <li><strong>2.1. Information You Provide:</strong> name, email, payment details, customer support correspondence.</li>
      <li><strong>2.2. Automatically Collected:</strong> IP address, device and browser type, usage data (pages visited, time spent).</li>
      <li><strong>2.3. Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to personalize your experience and analyze usage.</li>
    </ul>
  </section>
  <section>
    <h2>3. How We Use Information</h2>
    <ul>
      <li>To provide, maintain, and improve the Service.</li>
      <li>To process transactions and send you confirmations.</li>
      <li>To communicate updates, marketing, and support.</li>
      <li>To comply with legal obligations.</li>
    </ul>
  </section>
  <section>
    <h2>4. Sharing of Information</h2>
    <p>We do not sell your personal data. We may share with:</p>
    <ul>
      <li>Service Providers: hosting, payment processors, analytics.</li>
      <li>Legal Compliance: to comply with law, legal process, or government requests.</li>
      <li>Business Transfers: in connection with mergers, acquisitions, or asset sales.</li>
    </ul>
  </section>
  <section>
    <h2>5. Security</h2>
    <p>We implement reasonable technical and organizational measures to protect your data. However, no security system is impenetrable.</p>
  </section>
  <section>
    <h2>6. Children’s Privacy</h2>
    <p>We do not knowingly collect personal information from children under 16. If you believe we have, please contact us at ops@decodedmusic.com to request deletion.</p>
  </section>
  <section>
    <h2>7. Third-Party Services</h2>
    <p>Our Service may contain links to third-party sites. This Policy does not apply to those sites—you should review their policies.</p>
  </section>
  <section>
    <h2>8. Data Retention</h2>
    <p>We retain your information as long as needed to provide the Service and fulfill legal obligations.</p>
  </section>
  <section>
    <h2>9. Changes to Privacy Policy</h2>
    <p>We may update this Policy. We will notify you by posting a revised date at the top.</p>
  </section>
  <section>
    <h2>10. Contact Information</h2>
    <p>Data Controller: DecodedMusic.com | AHA LLC<br>
    Website: <a href="https://DecodedMusic.com">DecodedMusic.com</a><br>
    Email: <a href="mailto:ops@decodedmusic.com">ops@decodedmusic.com</a></p>
  </section>

  <h1>Your GDPR Data Rights</h1>
  <section>
    <ul>
      <li><strong>1. Right to Access:</strong> You may request a copy of the personal data we hold about you.</li>
      <li><strong>2. Right to Rectification:</strong> You may ask us to correct inaccurate or incomplete data.</li>
      <li><strong>3. Right to Erasure (“Right to be Forgotten”):</strong> You may request deletion of your personal data, subject to legal obligations.</li>
      <li><strong>4. Right to Restrict Processing:</strong> You may request that we pause processing of your data while a dispute is resolved.</li>
      <li><strong>5. Right to Data Portability:</strong> You may request your data in a structured, commonly used, machine-readable format.</li>
      <li><strong>6. Right to Object:</strong> You may object to processing of your personal data for direct marketing or on grounds relating to your situation.</li>
      <li><strong>7. Rights Related to Automated Decision-Making:</strong> You have the right not to be subject to decisions based solely on automated processing, where such decisions produce legal or similarly significant effects.</li>
    </ul>
    <h2>How to Exercise Your Rights</h2>
    <p>Submit your request via email with “GDPR Request” in the subject to <a href="mailto:ops@decodedmusic.com">ops@decodedmusic.com</a>. Please specify which right you are exercising and include enough information for us to verify your identity.</p>
    <h2>Response Time</h2>
    <p>We will respond to your request within one month. We may extend by two further months if your request is complex.</p>
    <h2>Lodging a Complaint</h2>
    <p>If you believe we have not addressed your request properly, you may lodge a complaint with your local supervisory authority.</p>
  </section>
</body>
</html>
EOF

# 2. Update footer to link to policies.html
FOOTER="src/components/Footer.js"
if [ -f "$FOOTER" ]; then
  # Add or update the policies link in the footer
  if grep -q "Terms of Service" "$FOOTER"; then
    sed -i 's|Terms of Service|<a href="/policies.html" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service & Privacy Policy</a>|g' "$FOOTER"
  else
    # Add the link at the end of the footer if not present
    sed -i '$a\<a href="/policies.html" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service & Privacy Policy</a>' "$FOOTER"
  fi
  echo "✅ Footer updated with policies link in $FOOTER"
else
  echo "⚠️  $FOOTER not found. Please add a link to /policies.html in your footer manually."
fi

echo "✅ Policies page created at public/policies.html"
echo "ℹ️  The footer now links to the updated policies."
