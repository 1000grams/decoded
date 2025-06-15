#!/bin/bash
# automate-cloudshell-deploy.sh
# Automates syncing the repo with AWS Amplify from an AWS CloudShell session.

# 1. Set your repo and Amplify identifiers
: "${REPO:?Set REPO to your GitHub repository URL}"       # e.g. https://github.com/yourname/yourrepo.git
: "${AMPLIFY_APP_ID:?Set AMPLIFY_APP_ID to your Amplify app ID}"
: "${AMPLIFY_ENV_NAME:?Set AMPLIFY_ENV_NAME to your Amplify environment}"   # e.g. prod or staging

# 2. Clone or update the repo
if [ ! -d musicdecoded ]; then
  git clone "$REPO" musicdecoded
  cd musicdecoded
else
  cd musicdecoded
  git pull origin main  # adjust branch if needed
fi

# 3. Use Node.js 18 via nvm
nvm install 18
nvm use 18

# 4. Clean caches and install dependencies
npm cache clean --force
rm -rf node_modules
npm ci

# 5. Install Amplify CLI and pull backend
npm install -g @aws-amplify/cli
amplify pull \
  --appId "$AMPLIFY_APP_ID" \
  --envName "$AMPLIFY_ENV_NAME" \
  --yes

# 6. Push backend changes
amplify push --yes

# 7. Build front-end and publish
cd decodedmusic-frontend
npm run build
amplify publish --yes
