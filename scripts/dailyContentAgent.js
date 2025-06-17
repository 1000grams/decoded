const fs = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

// Load environment variables from .env if present
try {
  const envPath = path.join(__dirname, '..', '.env');
  const envData = require('fs').readFileSync(envPath, 'utf8');
  envData.split(/\n+/).forEach((line) => {
    const match = line.match(/^(\w+)=(.*)$/);
    if (match) process.env[match[1]] = match[2];
  });
} catch (e) {
  // ignore missing .env
}

const REGION = process.env.AWS_REGION || 'us-east-1';
const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0';

async function generatePostContent(track) {
  const client = new BedrockRuntimeClient({ region: REGION });
  const prompt = `Create an Instagram caption with 3 hashtags and a short CTA for the track "${track}". Use a fun, upbeat tone with emojis.`;
  const command = new InvokeModelCommand({
    modelId: MODEL_ID,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({ prompt, max_tokens: 200 })
  });
  const response = await client.send(command);
  const completion = JSON.parse(new TextDecoder().decode(response.body)).completion;
  return completion.trim();
}

async function postToInstagram(caption, mediaUrl) {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) throw new Error('INSTAGRAM_TOKEN not set');
  const url = `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_USER_ID}/media`;
  await fetch(url + `?access_token=${token}&caption=${encodeURIComponent(caption)}&image_url=${encodeURIComponent(mediaUrl)}`, { method: 'POST' });
}

// Placeholder analytics fetch functions
async function getInstagramInsights() {
  console.log('Fetching Instagram insights...');
  return { reach: 1000, interactions: 75 };
}

async function summarizeAnalytics(data) {
  const client = new BedrockRuntimeClient({ region: REGION });
  const prompt = `Summarize the following engagement metrics and suggest one improvement:\n${JSON.stringify(data)}`;
  const command = new InvokeModelCommand({
    modelId: MODEL_ID,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({ prompt, max_tokens: 150 })
  });
  const response = await client.send(command);
  return JSON.parse(new TextDecoder().decode(response.body)).completion.trim();
}

async function run() {
  const caption = await generatePostContent('Fireproof');
  const mediaUrl = 'https://example.com/cover.jpg';
  await postToInstagram(caption, mediaUrl);
  const analytics = await getInstagramInsights();
  const summary = await summarizeAnalytics(analytics);
  await fs.writeFile('latest_social_summary.txt', summary);
  console.log('Daily content agent completed.');
}

run().catch(err => {
  console.error('Daily content agent failed', err);
  process.exit(1);
});
