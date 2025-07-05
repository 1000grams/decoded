#!/usr/bin/env node
/**
 * loadCatalog.js
 * Bulk ingest artist catalog JSON or CSV into DynamoDB.
 * Usage: node loadCatalog.js <inputFile> [--table <TableName>]
 */

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node loadCatalog.js <inputFile> [--table <TableName>]');
  process.exit(1);
}
const inputFile = args[0];
let tableName = process.env.TABLE_NAME || 'ArtistPortfolios';

const tableFlagIndex = args.indexOf('--table');
if (tableFlagIndex !== -1 && args[tableFlagIndex + 1]) {
  tableName = args[tableFlagIndex + 1];
}

// Configure AWS region (and credentials via environment or shared config)
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = new AWS.DynamoDB.DocumentClient();

function parseFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath, 'utf8');
  if (ext === '.json') {
    return JSON.parse(content);
  }
  if (ext === '.csv') {
    const lines = content.split(/\r?\n/).filter(line => line.trim());
    const headers = lines.shift().split(',').map(h => h.trim());
    return lines.map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    });
  }
  throw new Error('Unsupported file extension: ' + ext);
}

async function run() {
  const items = parseFile(inputFile);
  for (const item of items) {
    const params = { TableName: tableName, Item: item };
    try {
      await docClient.put(params).promise();
      console.log(`Upserted ${item.artistId || JSON.stringify(item)}`);
    } catch (err) {
      console.error('Error upserting item:', err);
    }
  }
  console.log('Ingestion complete');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
