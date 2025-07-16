#!/bin/bash
set -euo pipefail

# === CONFIGURATION ===
REGION="eu-central-1"
API_ID="0930nh8tai"
STAGE_NAME="prod"
RESOURCE_PATH="/artistmanager"
LAMBDA_FUNCTION_NAME="prod-artistManager"

# === STEP 1: Get Lambda ARN ===
echo "🔍 Fetching Lambda ARN for $LAMBDA_FUNCTION_NAME..."
LAMBDA_ARN=$(aws lambda get-function \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --region "$REGION" \
  --query 'Configuration.FunctionArn' \
  --output text)

echo "✅ Lambda ARN: $LAMBDA_ARN"

# === STEP 2: Ensure Resource Path Exists ===
echo "🔧 Ensuring resource $RESOURCE_PATH exists..."
PARENT_ID=$(aws apigateway get-resources \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --query "items[?path=='/'].id" \
  --output text)

EXISTING_RESOURCE_ID=$(aws apigateway get-resources \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --query "items[?path=='$RESOURCE_PATH'].id" \
  --output text)

if [[ -z "$EXISTING_RESOURCE_ID" ]]; then
  echo "📁 Creating resource path $RESOURCE_PATH..."
  RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --parent-id "$PARENT_ID" \
    --path-part "${RESOURCE_PATH#/}" \
    --query 'id' \
    --output text)
else
  RESOURCE_ID="$EXISTING_RESOURCE_ID"
  echo "✅ Resource already exists: $RESOURCE_ID"
fi

# === STEP 3: Add GET Method with Lambda Integration ===
echo "🔗 Adding GET method with Lambda integration..."
aws apigateway put-method \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method GET \
  --authorization-type "NONE" || echo "⚠️ GET method already exists."

aws apigateway put-integration \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method GET \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations"

# === STEP 4: Add POST Method with Lambda Integration ===
echo "🔗 Adding POST method with Lambda integration..."
aws apigateway put-method \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method POST \
  --authorization-type "NONE" || echo "⚠️ POST method already exists."

aws apigateway put-integration \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations"

# === STEP 5: Add OPTIONS Method for CORS ===
echo "🌐 Adding OPTIONS method for CORS..."
aws apigateway put-method \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method OPTIONS \
  --authorization-type "NONE" || echo "⚠️ OPTIONS method already exists."

aws apigateway put-method-response \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Headers":true,"method.response.header.Access-Control-Allow-Methods":true,"method.response.header.Access-Control-Allow-Origin":true}' \
  --response-models '{"application/json":"Empty"}' || echo "⚠️ OPTIONS response already exists."

aws apigateway put-integration \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method OPTIONS \
  --type MOCK \
  --request-templates '{"application/json":"{\"statusCode\": 200}"}' || echo "⚠️ OPTIONS integration already exists."

aws apigateway put-integration-response \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --resource-id "$RESOURCE_ID" \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Headers": "'\''Content-Type,X-Amz-Date,Authorization,X-Api-Key'\''",
    "method.response.header.Access-Control-Allow-Methods": "'\''GET,POST,OPTIONS'\''",
    "method.response.header.Access-Control-Allow-Origin": "'\''*'\''"
  }' || echo "⚠️ OPTIONS integration response already exists."

# === STEP 6: Deploy the API ===
echo "🚀 Deploying API to stage: $STAGE_NAME..."
aws apigateway create-deployment \
  --rest-api-id "$API_ID" \
  --region "$REGION" \
  --stage-name "$STAGE_NAME"

echo "✅ DONE! $RESOURCE_PATH is live with GET, POST, and CORS enabled!"
