const https = require("https");
const querystring = require("querystring");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};

  if (!params.code) {
    const authURL = `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: "user-read-email",
    })}`;
    return {
      statusCode: 302,
      headers: { Location: authURL },
    };
  }

  const body = querystring.stringify({
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const options = {
    hostname: "accounts.spotify.com",
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": body.length,
    },
  };

  const tokenData = await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });

  return {
    statusCode: 200,
    body: JSON.stringify(tokenData),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
