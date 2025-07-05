// Lambda for /viral-predictions endpoint
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const token = event.headers.Authorization?.split(' ')[1];
  if (!token) {
    return { statusCode: 401, body: 'Missing token' };
  }
  // TODO: validate token with Cognito if needed

  // Extract artistId from token claims (skip actual validation here)
  // In real code, decode token and read claim like 'username' or 'email'
  const artistId = event.requestContext.authorizer?.claims['cognito:username'] || 'UNKNOWN';

  // Query DynamoDB Viral table for that artist
  const params = {
    TableName: process.env.VIRAL_TABLE_NAME,
    KeyConditionExpression: 'artistId = :artistId',
    ExpressionAttributeValues: { ':artistId': artistId }
  };
  try {
    const result = await dynamodb.query(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Items) };
  } catch (err) {
    console.error('Viral query error', err);
    return { statusCode: 500, body: 'Server error' };
  }
};
