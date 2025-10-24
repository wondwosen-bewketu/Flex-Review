# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Flex Living Reviews Dashboard to Vercel.

## Prerequisites

1. Vercel account (free tier available at [vercel.com](https://vercel.com/))
2. Vercel CLI installed: `npm install -g vercel`
3. Both frontend and backend code ready for deployment

## Deployment Steps

### 1. Backend Deployment (NestJS API)

#### Step 1: Navigate to the backend directory
```bash
cd flex-reviews-backend
```

#### Step 2: Build the backend
```bash
npm run build
```

#### Step 3: Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy to Vercel
- Choose the default settings
- When asked about the project name, you can use `flex-reviews-backend` or any name you prefer

#### Step 4: Set Environment Variables
After deployment, go to your Vercel dashboard:
1. Navigate to your backend project
2. Go to Settings > Environment Variables
3. Add the following variables:
   - `HOSTAWAY_ACCOUNT_ID` = Your Hostaway account ID (61148 for the assessment)
   - `HOSTAWAY_API_KEY` = Your Hostaway API key
   - `GOOGLE_PLACES_API_KEY` = Your Google Places API key (optional)
   - `PORT` = 3000 (Vercel default)

#### Step 5: Redeploy
After setting environment variables, redeploy the backend:
```bash
vercel --prod
```

Note the deployed URL (e.g., `https://your-backend-project.vercel.app`)

### 2. Frontend Deployment (React Dashboard)

#### Step 1: Update API URLs
Before deploying the frontend, you need to update the API base URL to point to your deployed backend.

Run the provided script with your backend URL:
```bash
cd ..
./update-api-urls.sh "https://your-backend-project.vercel.app"
```

Alternatively, you can manually update the API configuration:
1. Open `flex-reviews-frontend/src/config/api.config.ts`
2. Update the API_BASE to your deployed backend URL:
   ```typescript
   export const API_BASE = "https://your-backend-project.vercel.app";
   ```

#### Step 2: Navigate to the frontend directory
```bash
cd flex-reviews-frontend
```

#### Step 3: Build the frontend
```bash
npm run build
```

#### Step 4: Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy to Vercel
- Choose the default settings
- When asked about the project name, you can use `flex-reviews-frontend` or any name you prefer

#### Step 5: Redeploy to Production
```bash
vercel --prod
```

## Deployment Scripts

### Automated Deployment Script
The project includes a deployment script that automates the deployment process:

```bash
./deploy.sh
```

This script will:
1. Check if Vercel CLI is installed
2. Deploy the backend
3. Deploy the frontend

Note: You'll still need to manually set environment variables in the Vercel dashboard.

### API URL Update Script
The project includes a script to update API URLs in all frontend files:

```bash
./update-api-urls.sh "https://your-backend-url.vercel.app"
```

## Environment Variables

### Backend Environment Variables
Set these in the Vercel dashboard for the backend project:
- `HOSTAWAY_ACCOUNT_ID` - Your Hostaway account ID
- `HOSTAWAY_API_KEY` - Your Hostaway API key
- `GOOGLE_PLACES_API_KEY` - Your Google Places API key (optional)
- `PORT` - 3000 (Vercel default)

### Frontend Environment Variables
The frontend doesn't require environment variables as API URLs are hardcoded in the config file.

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify that the backend URL in `api.config.ts` is correct
   - Check that the backend is deployed and running
   - Ensure environment variables are set correctly in the Vercel dashboard

2. **CORS Errors**
   - The backend should already have CORS enabled
   - Verify that the frontend is making requests to the correct backend URL

3. **Build Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check that the build commands in `package.json` are correct

### Checking Deployment Status

You can check the status of your deployments in the Vercel dashboard or using the CLI:
```bash
vercel list
```

## Post-Deployment

### Testing the Deployment
1. Visit your frontend URL to access the dashboard
2. Check that all pages load correctly
3. Verify that you can fetch reviews from the backend
4. Test the review selection functionality

### Monitoring
- Use the Vercel dashboard to monitor deployments and logs
- Set up alerts for failed deployments
- Monitor usage and performance metrics

## Conclusion

Following these steps will deploy both the frontend and backend of the Flex Living Reviews Dashboard to Vercel. The application will be accessible via the URLs provided by Vercel, and the frontend will communicate with the backend through the configured API endpoints.