#!/bin/bash

echo "🚀 Starting optimized production build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# Set production environment
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Build the application
echo "🔨 Building application..."
npm run build

# Check build output
echo "📊 Build stats:"
du -sh .next/static
du -sh .next/server

# Analyze bundle if needed
if [ "$1" = "--analyze" ]; then
  echo "📈 Analyzing bundle..."
  ANALYZE=true npm run build
fi

echo "✅ Build complete!"
echo ""
echo "To test locally:"
echo "  npm run start"
echo ""
echo "To run Lighthouse:"
echo "  npx lighthouse http://localhost:3000 --view"