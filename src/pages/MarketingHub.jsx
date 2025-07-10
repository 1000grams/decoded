import React, { useEffect, useState } from 'react';
import SuggestionTile from '../components/SuggestionTile.jsx';
import { FaChartPie, FaBullhorn, FaCalendarAlt, FaFire } from 'react-icons/fa';
import cognitoAuthService from '../services/CognitoAuthService';
import { fetchArtistData } from '../services/ArtistService';
import { generateContent } from '../services/BedrockService';
import './MarketingHub.css';

function MarketingHub() {
  const [artistId, setArtistId] = useState('');
  const [weeklyGrowth, setWeeklyGrowth] = useState({ subscribers: 0, streams: 0 });
  const [metaLlamaResult, setMetaLlamaResult] = useState('');
  const [contentPlan, setContentPlan] = useState([]);

  useEffect(() => {
    async function fetchArtistId() {
      try {
        const id = await cognitoAuthService.getArtistIdFromCognito();
        setArtistId(id);

        // Fetch artist data after getting the artist ID
        const artistData = await fetchArtistData(id);
        console.log('Artist Data:', artistData);
        // You can set artist data to state if needed
      } catch (error) {
        console.error('Error fetching artist ID or artist data:', error);
      }
    }

    async function fetchMetaLlamaResult() {
      try {
        const result = await generateContent('Generate a captivating social media post for Rue de Vivre’s latest single.');
        setMetaLlamaResult(result);
      } catch (error) {
        console.error('Error generating content with AWS Bedrock:', error);
      }
    }

    fetchArtistId();
    fetchMetaLlamaResult();

    // Fetch weekly growth tracking data (mocked for now)
    setWeeklyGrowth({ subscribers: 120, streams: 4500 });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)',
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        color: '#fff',
        padding: '0',
      }}
    >
      {/* Header Section */}
      <section
        style={{
          padding: '4rem 0 2rem 0',
          textAlign: 'center',
          background: 'linear-gradient(120deg, #1e293b 60%, #2563eb 100%)',
          boxShadow: '0 8px 32px #0002',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 900,
            letterSpacing: '0.01em',
            marginBottom: 24,
            color: '#fff',
            textShadow: '0 4px 32px #2563eb55, 0 2px 0 #fff2',
          }}
        >
          Marketing Plan and Content Plan
        </h1>
      </section>

      {/* Mid-Container Section */}
      <section
        style={{
          padding: '2rem',
          background: '#1e293b',
          color: '#e0e7ef',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Marketing Plan: "This Week's Agenda"</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          <strong>Objective:</strong> Drive week-over-week growth in subscribers and listening stats for Rue de Vivre.
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          <strong>Key Metrics:</strong>
          <ul style={{ listStyleType: 'disc', margin: '1rem 0', paddingLeft: '1.5rem', textAlign: 'left' }}>
            <li>Subscribers: Growth in app downloads and social media followers.</li>
            <li>Listening Stats: Metrics like total streams, unique listeners, and engagement (e.g., likes, shares).</li>
          </ul>
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          <strong>Platforms:</strong> Instagram, Snapchat, Facebook, YouTube, Spotify.
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          <strong>Tools:</strong>
          <ul style={{ listStyleType: 'disc', margin: '1rem 0', paddingLeft: '1.5rem', textAlign: 'left' }}>
            <li>AWS Bedrock: Generate engaging content using Meta Llama 3.2.</li>
            <li>Meta Graph API: Automate posting to Facebook and Instagram.</li>
            <li>Trends Module: Identify trending topics and hashtags for content optimization.</li>
          </ul>
        </p>
      </section>

      {/* Weekly Growth Tracking Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '2rem',
          background: '#2563eb',
          color: '#fff',
        }}
      >
        {/* Left Column: Weekly Growth Tracking Details */}
        <div style={{ flex: 1, paddingRight: '1rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Weekly Growth Tracking</h2>
          <ul style={{ listStyleType: 'disc', margin: '1rem 0', paddingLeft: '1.5rem' }}>
            <li>Subscribers:</li>
            <ul style={{ listStyleType: 'circle', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Instagram followers.</li>
              <li>App downloads (tracked via app analytics).</li>
            </ul>
            <li>Listening Stats:</li>
            <ul style={{ listStyleType: 'circle', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Total streams on Spotify.</li>
              <li>Unique listeners.</li>
              <li>Engagement metrics (likes, shares, comments).</li>
            </ul>
          </ul>
        </div>

        {/* Right Column: Actual Results */}
        <div style={{ flex: 1, paddingLeft: '1rem', borderLeft: '2px solid #fff' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Actual Results</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Subscribers: {weeklyGrowth.subscribers}</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Streams: {weeklyGrowth.streams}</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Unique Listeners: 3200</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Engagement: 450 likes, 120 shares, 80 comments</p>
        </div>
      </section>

      {/* Meta Llama Prompt and Results Section */}
      <section
        style={{
          padding: '2rem',
          background: '#1e293b',
          color: '#e0e7ef',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Meta Llama Prompt</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Generate a captivating social media post for Rue de Vivre’s latest single.
        </p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Generated Post</h2>
        <p style={{ fontSize: '1.2rem' }}>{metaLlamaResult}</p>
      </section>

      {/* Feature Cards Section */}
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          margin: '3rem 0 2rem 0',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 24,
            boxShadow: '0 8px 32px #0002',
            padding: '2rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1.5px solid #e0e7ef',
            position: 'relative',
          }}
        >
          <h2 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Ad Spend Summary</h2>
          <p style={{ color: '#222', fontSize: '1rem' }}>Track every dollar, maximize every campaign.</p>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 24,
            boxShadow: '0 8px 32px #0002',
            padding: '2rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1.5px solid #e0e7ef',
            position: 'relative',
          }}
        >
          <h2 style={{ color: '#1db954', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>ROI & Attribution</h2>
          <p style={{ color: '#222', fontSize: '1rem' }}>See what works, prove your impact, scale your reach.</p>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 24,
            boxShadow: '0 8px 32px #0002',
            padding: '2rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1.5px solid #e0e7ef',
            position: 'relative',
          }}
        >
          <h2 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Post Scheduler</h2>
          <p style={{ color: '#222', fontSize: '1rem' }}>Plan, automate, and optimize your content calendar.</p>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 24,
            boxShadow: '0 8px 32px #0002',
            padding: '2rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1.5px solid #e0e7ef',
            position: 'relative',
          }}
        >
          <h2 style={{ color: '#1db954', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Trending-Based Auto-Reposts</h2>
          <p style={{ color: '#222', fontSize: '1rem' }}>Ride the wave—automatically boost what’s hot.</p>
        </div>
      </section>

      {/* Suggestion Tiles Section */}
      <div style={{ display: 'flex', gap: '1.2rem', margin: '2.5rem 0 0 0', flexWrap: 'wrap', justifyContent: 'center' }}>
        <SuggestionTile key="analytics" icon={<FaChartPie />}>
          Unified campaign analytics
        </SuggestionTile>
        <SuggestionTile key="marketing" icon={<FaBullhorn />}>
          Multi-channel marketing
        </SuggestionTile>
        <SuggestionTile key="scheduling" icon={<FaCalendarAlt />}>
          Automated scheduling
        </SuggestionTile>
        <SuggestionTile key="trends" icon={<FaFire />}>
          Real-time trend insights
        </SuggestionTile>
      </div>

      {/* Weekly Content Plan Section */}
      <section
        style={{
          padding: '2rem',
          background: '#1e293b',
          color: '#e0e7ef',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Weekly Content Plan</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>
          Hype Headline: "This Week's Agenda: {artistId} Takes Over Your Playlist!"
        </p>
        <table
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            borderCollapse: 'collapse',
            textAlign: 'left',
            color: '#e0e7ef',
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #2563eb', padding: '0.5rem' }}>Platform</th>
              <th style={{ borderBottom: '2px solid #2563eb', padding: '0.5rem' }}>Content Idea</th>
              <th style={{ borderBottom: '2px solid #2563eb', padding: '0.5rem' }}>Goal</th>
              <th style={{ borderBottom: '2px solid #2563eb', padding: '0.5rem' }}>Execution</th>
            </tr>
          </thead>
          <tbody>
            {contentPlan.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>{item.platform}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>{item.contentIdea}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>{item.goal}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #444' }}>{item.execution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default MarketingHub;
