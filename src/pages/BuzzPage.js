import React, { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';

function BuzzPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/industry_buzz.txt')
      .then(res => res.text())
      .then(text => setContent(text.trim()))
      .catch(() => setContent('No update available.'));
  }, []);

  const runDate = new Date().toISOString().split('T')[0];

  return (
    <PageLayout>
      <section style={{ background: '#fff', color: '#1F2937', padding: '1rem' }}>
        <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
          <header style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Industry Buzz</h1>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Buzz | Music Management Researcher</p>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Run date: {runDate}</p>
          </header>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>{content}</pre>
        </div>
      </section>
    </PageLayout>
  );
}

export default BuzzPage;
