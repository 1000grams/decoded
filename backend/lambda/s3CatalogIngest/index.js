// Lambda to ingest catalog CSV/JSON from S3 into DynamoDB
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
    console.log(`Processing S3 object: ${bucket}/${key}`);

    // Fetch the object
    const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    let items;
    if (key.endsWith('.json')) {
      items = JSON.parse(data.Body.toString('utf-8'));
    } else if (key.endsWith('.csv')) {
      const csv = data.Body.toString('utf-8');
      const lines = csv.split(/\r?\n/).filter(l => l);
      const headers = lines.shift().split(',');
      items = lines.map(line => {
        const parts = line.split(',');
        const obj = {};
        headers.forEach((h, i) => (obj[h.trim()] = parts[i].trim()));
        return obj;
      });
    } else {
      console.warn('Unsupported file type, skipping');
      continue;
    }

    // Determine artistId from object key prefix (e.g. "rdv/catalog.csv")
    const keySegments = key.split('/');
    const artistId = keySegments[0].toUpperCase();

    // Write items to DynamoDB
    for (const item of items) {
      const putParams = {
        TableName: process.env.TABLE_NAME,
        Item: { artistId, ...item }
      };
      await docClient.put(putParams).promise();
      console.log(`Upserted record for ${artistId}`);
    }
  }
  return { statusCode: 200, body: 'Ingestion complete' };
};
