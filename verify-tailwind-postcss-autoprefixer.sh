#!/bin/bash
# verify-tailwind-postcss-autoprefixer.sh

PKG="decodedmusic-frontend/package.json"

if [ ! -f "$PKG" ]; then
  echo "❌ $PKG not found."
  exit 1
fi

echo "🔍 Checking $PKG for correct Tailwind, PostCSS, and Autoprefixer entries..."

# Check tailwindcss version
TAILWIND=$(jq -r '.dependencies.tailwindcss // .devDependencies.tailwindcss' "$PKG")
if [[ "$TAILWIND" =~ ^\^?[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "✅ tailwindcss uses a version specifier: $TAILWIND"
else
  echo "❌ tailwindcss is not using a version specifier: $TAILWIND"
fi

# Check postcss and autoprefixer
POSTCSS=$(jq -r '.devDependencies.postcss' "$PKG")
AUTOPREFIXER=$(jq -r '.devDependencies.autoprefixer' "$PKG")

if [[ "$POSTCSS" =~ ^\^?[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "✅ postcss uses a version specifier: $POSTCSS"
else
  echo "❌ postcss is not using a version specifier: $POSTCSS"
fi

if [[ "$AUTOPREFIXER" =~ ^\^?[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "✅ autoprefixer uses a version specifier: $AUTOPREFIXER"
else
  echo "❌ autoprefixer is not using a version specifier: $AUTOPREFIXER"
fi

# Check for tarball URL in tailwindcss
if grep -q 'tailwindcss.*http' "$PKG"; then
  echo "❌ tailwindcss is using a tarball URL. Please use a version specifier."
fi

echo "🔎 Review complete."

