#!/bin/bash
# Verifies essential files for AWS Amplify deployment and creates minimal placeholders if missing.
set -e

# Ensure amplify.yml exists
if [ ! -f amplify.yml ]; then
  echo "amplify.yml missing. Creating default configuration."
  cat > amplify.yml <<'YAML'
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm install 18
        - nvm use 18
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
YAML
fi

# Ensure Amplify configuration files exist
PROJECT_CONFIG="amplify/.config/project-config.json"
TEAM_INFO="amplify/team-provider-info.json"
BACKEND_CONFIG="amplify/backend/backend-config.json"

# Create team-provider-info.json if missing or empty
if [ ! -s "$TEAM_INFO" ]; then
  echo "team-provider-info.json missing or empty. Creating minimal file."
  mkdir -p "$(dirname "$TEAM_INFO")"
  echo '{}' > "$TEAM_INFO"
fi

# Create project-config.json if missing
if [ ! -f "$PROJECT_CONFIG" ]; then
  echo "project-config.json missing. Creating minimal project config."
  mkdir -p "$(dirname "$PROJECT_CONFIG")"
  cat > "$PROJECT_CONFIG" <<'JSON'
{
  "projectName": "musicdecoded",
  "version": "3.0",
  "frontend": "javascript",
  "javascript": {
    "framework": "react",
    "config": {
      "SourceDir": "src",
      "DistributionDir": "build",
      "BuildCommand": "npm run-script build",
      "StartCommand": "npm run-script start"
    }
  },
  "providers": [
    "awscloudformation"
  ]
}
JSON
fi

# Create backend-config.json if missing
if [ ! -f "$BACKEND_CONFIG" ]; then
  echo "backend-config.json missing. Creating empty config."
  mkdir -p "$(dirname "$BACKEND_CONFIG")"
  echo '{}' > "$BACKEND_CONFIG"
fi

# Ensure Lambda package exists
LAMBDA_DIR="amplify/backend/function/DecodedMusicLambda/src"
LAMBDA_ZIP="$LAMBDA_DIR/decodedmusic_lambda_package.zip"
if [ ! -f "$LAMBDA_ZIP" ]; then
  echo "Lambda package missing. Creating placeholder package."
  mkdir -p "$LAMBDA_DIR"
  cat > "$LAMBDA_DIR/lambda_function.py" <<'PY'
import json

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({"message": "placeholder"})
    }
PY
  (cd "$LAMBDA_DIR" && zip -q decodedmusic_lambda_package.zip lambda_function.py && rm lambda_function.py)
fi

# Ensure CloudFormation template exists
CF_TEMPLATE="amplify/backend/function/DecodedMusicLambda/cloudformation-template.json"
if [ ! -f "$CF_TEMPLATE" ]; then
  echo "CloudFormation template missing. Creating minimal template."
  mkdir -p "$(dirname "$CF_TEMPLATE")"
  cat > "$CF_TEMPLATE" <<'JSON'
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Placeholder Lambda",
  "Resources": {}
}
JSON
fi

# Ensure src/index.js exists
if [ ! -f src/index.js ]; then
  echo "src/index.js missing. Creating basic React entry point."
  mkdir -p src
  cat > src/index.js <<'JS'
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <div>Placeholder App</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
JS
fi

# Ensure public/index.html exists
if [ ! -f public/index.html ]; then
  echo "public/index.html missing. Creating placeholder HTML."
  mkdir -p public
  cat > public/index.html <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Decoded Music</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
HTML
fi

echo "Amplify setup verification complete." 
