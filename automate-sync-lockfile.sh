#!/bin/bash
# automate-sync-lockfile.sh
# This script syncs package-lock.json with package.json for the front-end

set -e

# Configure git user for non-interactive environments
git config user.name "${GIT_USER_NAME:-github-actions}"
git config user.email "${GIT_USER_EMAIL:-github-actions@github.com}"

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT" || exit 1

echo "➡️ Pulling latest changes"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
git pull origin "$BRANCH"

FRONTEND_DIR="decodedmusic-frontend"
cd "$FRONTEND_DIR" || exit 1

echo "➡️ Removing old lockfile and node_modules"
rm -rf node_modules package-lock.json

echo "➡️ Reinstalling dependencies"
npm install

echo "➡️ Verifying build"
npm run build

cd "$REPO_ROOT"
echo "➡️ Committing updated lockfile"
git add "$FRONTEND_DIR/package.json" "$FRONTEND_DIR/package-lock.json"
git commit -m "chore: sync package-lock.json with package.json"

echo "➡️ Pushing changes"
git push origin "$BRANCH"

echo "✅ Lockfile synchronized"
