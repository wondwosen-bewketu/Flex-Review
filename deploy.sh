#!/bin/bash

# Deployment script for Flex Reviews Dashboard
# This script helps deploy both frontend and backend to Vercel

echo "Flex Reviews Dashboard Deployment Script"
echo "======================================"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "Vercel CLI could not be found. Please install it with:"
    echo "npm install -g vercel"
    exit 1
fi

echo ""
echo "IMPORTANT: Before deploying, please ensure you have:"
echo "1. Set up your Vercel account and logged in with 'vercel login'"
echo "2. Set environment variables in the Vercel dashboard for the backend:"
echo "   - HOSTAWAY_ACCOUNT_ID"
echo "   - HOSTAWAY_API_KEY" 
echo "   - GOOGLE_PLACES_API_KEY (optional)"
echo "3. For frontend, set VITE_API_BASE in Vercel project settings"
echo ""

read -p "Continue with deployment? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "1. Deploying Backend (NestJS API)"
echo "--------------------------------"
cd flex-reviews-backend

echo "Building backend..."
npm run build

echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "2. Deploying Frontend (React Dashboard)"
echo "--------------------------------------"
cd ../flex-reviews-frontend

echo "Building frontend..."
npm run build

echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "Deployment completed!"
echo "===================="
echo "Remember to:"
echo "1. Set environment variables in the Vercel dashboard for the backend"
echo "2. Set VITE_API_BASE environment variable in Vercel project settings for the frontend"
echo "3. Redeploy after setting environment variables"
echo ""
echo "For detailed deployment instructions, see VERCEL_DEPLOYMENT_GUIDE.md"