#!/bin/bash

# Script to update API base URLs in frontend files
# Usage: ./update-api-urls.sh "https://your-backend-url.vercel.app"

if [ $# -eq 0 ]; then
    echo "Error: No backend URL provided"
    echo "Usage: ./update-api-urls.sh \"https://your-backend-url.vercel.app\""
    exit 1
fi

BACKEND_URL=$1

echo "Updating API base URLs to: $BACKEND_URL"

# Update Dashboard.tsx
sed -i '' "s|const API_BASE = \"[^\"]*\"|const API_BASE = \"$BACKEND_URL\"|" flex-reviews-frontend/src/pages/Dashboard.tsx

# Update ReviewsPage.tsx
sed -i '' "s|const API_BASE = \"[^\"]*\"|const API_BASE = \"$BACKEND_URL\"|" flex-reviews-frontend/src/pages/ReviewsPage.tsx

# Update PropertyPage.tsx
sed -i '' "s|const API_BASE = \"[^\"]*\"|const API_BASE = \"$BACKEND_URL\"|" flex-reviews-frontend/src/pages/PropertyPage.tsx

echo "API URLs updated successfully!"