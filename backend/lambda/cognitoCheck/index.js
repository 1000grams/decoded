const { CognitoIdentityProviderClient, AdminListGroupsForUserCommand } = require('@aws-sdk/client-cognito-identity-provider');

const REGION = process.env.AWS_REGION || 'eu-central-1';
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID || '5fxmkd';
const ARTIST_GROUP = process.env.ARTIST_GROUP || 'artist';
const client = new CognitoIdentityProviderClient({ region: REGION });

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const email = body.email;
    if (!email) return response(400, { message: 'email required' });

    const res = await client.send(new AdminListGroupsForUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email
    }));
    const groups = res.Groups || [];
    const authorized = groups.some(g => g.GroupName === ARTIST_GROUP);
    return response(200, { authorized });
  } catch (err) {
    console.error('cognito check error', err);
    return response(500, { message: 'error' });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body)
  };
}
