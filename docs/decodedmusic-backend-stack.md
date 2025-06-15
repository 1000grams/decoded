# DecodedMusicBackend CloudFormation Stack

This stack is used by Codex and GitHub automation to provision the core backend services.

- **Stack Name:** `DecodedMusicBackend`
- **Resources:** AWS Lambda, API Gateway and a DynamoDB table
- After deployment the CloudFormation console should show a status of `CREATE_COMPLETE`.

Deploy with:

```bash
aws cloudformation deploy \
  --template-file backend/cloudformation/decodedMusicBackend.yaml \
  --stack-name DecodedMusicBackend \
  --capabilities CAPABILITY_NAMED_IAM
```

For Codex automation you can reference the template file relative to the repo root:

```json
{
  "templateFile": "backend/cloudformation/decodedMusicBackend.yaml"
}
```
