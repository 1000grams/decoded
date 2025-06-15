#!/bin/bash
# automate-amplify-github-setup.sh

# 1. Ensure amplify is initialized (run interactively if not already done)
if [ ! -d amplify ]; then
  echo "Amplify not initialized. Please run 'amplify init' interactively first."
  exit 1
fi

# 2. Ensure backend folders exist
mkdir -p amplify/backend/function/DecodedMusicLambda/src

# 3. Move Lambda package and CloudFormation template if they exist in root
if [ -f decodedmusic_lambda_package.zip ]; then
  mv decodedmusic_lambda_package.zip amplify/backend/function/DecodedMusicLambda/src/
  echo "✅ Moved Lambda package to amplify/backend/function/DecodedMusicLambda/src/"
fi

if [ -f decodedmusic_backend_cf.json ]; then
  mv decodedmusic_backend_cf.json amplify/backend/function/DecodedMusicLambda/cloudformation-template.json
  echo "✅ Moved CloudFormation template to amplify/backend/function/DecodedMusicLambda/cloudformation-template.json"
fi

# 4. Add and commit changes
git add amplify/
git commit -m "Automated: Add Amplify backend Lambda and CloudFormation files"
git push origin main

echo "🚀 Amplify backend files are in place and changes pushed to GitHub."
echo "When Amplify builds from GitHub, it will use these backend resources."
