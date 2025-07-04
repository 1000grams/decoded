const AWS = require("aws-sdk");
const ssm = new AWS.SSM();
const secretsManager = new AWS.SecretsManager();

const secretNames = [
  "my/newsApiKey",
  "my/stripeSecret",
  "my/facebookToken",
  "my/instagramToken",
  "my/spotifyClientId",
  "my/spotifyClientSecret",
];

const ssmParams = ["/decoded/s3Bucket"];

exports.handler = async () => {
  try {
    // \ud83d\udd0d Fetch and log SSM Parameters
    for (const name of ssmParams) {
      try {
        const param = await ssm.getParameter({
          Name: name,
          WithDecryption: false,
        }).promise();
        console.log(`\u2705 SSM Param [${name}]:`, param.Parameter.Value);
      } catch (err) {
        console.error(`\u274c SSM Param [${name}] error:`, err.message);
      }
    }

    // \ud83d\udd0d Fetch and log each secret
    for (const name of secretNames) {
      try {
        const secret = await secretsManager.getSecretValue({
          SecretId: name,
        }).promise();

        const parsed = secret.SecretString.startsWith("{")
          ? JSON.parse(secret.SecretString)
          : secret.SecretString;

        console.log(`\u2705 Secret [${name}]:`, parsed);
      } catch (err) {
        console.error(`\u274c Secret [${name}] error:`, err.message);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Secrets + Params test complete" }),
    };
  } catch (err) {
    console.error("\ud83d\udca5 Unexpected error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

// Allow running in CloudShell
if (require.main === module) {
  exports.handler();
}
