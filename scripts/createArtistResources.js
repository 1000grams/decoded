#!/usr/bin/env node
/**
 * scripts/createArtistResources.js
 * 
 * Creates two S3 buckets for a new artist:
 *  - decodedmusic-artist-<ID>-catalog
 *  - decodedmusic-artist-<ID>-clips
 * 
 * Usage: node scripts/createArtistResources.js <ARTIST_ID>
 * Example: node scripts/createArtistResources.js RDV
 */

const AWS = require('aws-sdk');
const process = require('process');

// Read artist identifier from command line
const artistId = process.argv[2];
if (!artistId) {
  console.error('Error: Missing artist ID. Usage: node createArtistResources.js <ARTIST_ID>');
  process.exit(1);
}

// Configure AWS (region and credentials via environment or shared config)
const region = process.env.AWS_REGION || 'us-east-1';
AWS.config.update({ region });
const s3 = new AWS.S3();

// Generic bucket names for all artists
const catalogBucket = 'decodedmusic-artist-catalog';
const clipsBucket = 'decodedmusic-artist-clips';

async function createBucket(bucketName) {
  try {
    console.log(`Creating bucket: ${bucketName}`);
    await s3.createBucket({ Bucket: bucketName }).promise();
    // Enable versioning
    await s3.putBucketVersioning({
      Bucket: bucketName,
      VersioningConfiguration: { Status: 'Enabled' }
    }).promise();
    // Set a basic CORS policy
    await s3.putBucketCors({
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [{
          AllowedOrigins: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
          AllowedHeaders: ['*'],
          MaxAgeSeconds: 3000
        }]
      }
    }).promise();
    console.log(`Bucket ${bucketName} created and configured.`);
  } catch (err) {
    if (err.code === 'BucketAlreadyOwnedByYou') {
      console.warn(`Bucket already exists: ${bucketName}`);
    } else {
      console.error(`Failed to create/configure bucket ${bucketName}:`, err);
    }
  }
}

async function main() {
  console.log(`Setting up S3 resources in region '${region}' for catalog and clips`);
  await createBucket(catalogBucket);
  await createBucket(clipsBucket);
  console.log(`
Next steps:
`);
  console.log(`1. Upload your PRO catalog CSV/JSON under an artist folder (e.g. RDV):`);
  console.log(`   aws s3 cp path/to/rdv_catalog.csv s3://${catalogBucket}/rdv/catalog.csv`);
  console.log(`
2. Upload song clips under artist folder:
   aws s3 cp clip1.mp3 s3://${clipsBucket}/rdv/clip1.mp3
   aws s3 cp /path/to/clips/ s3://${clipsBucket}/rdv/ --recursive
`);
  console.log(`
3. (Optional) Trigger your ingestion Lambda on s3:ObjectCreated events for the '${catalogBucket}' bucket.
`);
}

main().catch(err => console.error('Error provisioning resources:', err));
