# Deployment Instructions for Flex Reviews Dashboard

This guide provides step-by-step instructions for deploying both the frontend and backend of the Flex Reviews Dashboard to Vercel.

## Prerequisites

1. Create accounts on [Vercel](https://vercel.com/) (free tier available)
2. Install Vercel CLI: `npm install -g vercel`
3. Login to Vercel CLI: `vercel login`

## Backend Deployment (NestJS API)

### 1. Prepare Environment Variables

Before deploying, you'll need to set up environment variables in Vercel:

- `HOSTAWAY_ACCOUNT_ID` - Your Hostaway account ID
- `HOSTAWAY_API_KEY` - Your Hostaway API key
- `GOOGLE_PLACES_API_KEY` - Your Google Places API key (optional)

### 2. Deploy to Vercel

1. Navigate to the backend directory:
   ```bash
   cd flex-reviews-backend
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy to Vercel
   - Select the default project settings
   - When asked about environment variables, add them in the Vercel dashboard later

4. After initial deployment, set environment variables in the Vercel dashboard:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add the required variables:
     - `HOSTAWAY_ACCOUNT_ID` = your_account_id
     - `HOSTAWAY_API_KEY` = your_api_key
     - `GOOGLE_PLACES_API_KEY` = your_google_api_key (optional)

5. Redeploy the project to apply environment variables:
   ```bash
   vercel --prod
   ```

### 3. Note the Backend URL

After deployment, note the URL provided by Vercel (e.g., `https://your-backend-project.vercel.app`). You'll need this for the frontend configuration.

## Frontend Deployment (React Dashboard)

### 1. Update API Base URL

Before deploying the frontend, update the API base URL in the frontend code:

1. Open `flex-reviews-frontend/src/pages/Dashboard.tsx`
2. Replace `const API_BASE = "http://localhost:3000";` with your deployed backend URL:
   ```typescript
   const API_BASE = "https://your-backend-project.vercel.app";
   ```

3. Do the same for `flex-reviews-frontend/src/pages/ReviewsPage.tsx`
4. And for `flex-reviews-frontend/src/pages/PropertyPage.tsx`

### 2. Deploy to Vercel

1. Navigate to the frontend directory:
   ```bash
   cd flex-reviews-frontend
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy to Vercel
   - Select the default project settings

4. Deploy to production:
   ```bash
   vercel --prod
   ```

## Post-Deployment Configuration

### Environment Variables Setup

In the Vercel dashboard for your backend project:

1. Go to your backend project
2. Click on "Settings" → "Environment Variables"
3. Add the following variables:
   - `HOSTAWAY_ACCOUNT_ID` = your actual Hostaway account ID
   - `HOSTAWAY_API_KEY` = your actual Hostaway API key
   - `GOOGLE_PLACES_API_KEY` = your actual Google Places API key (optional)
4. Redeploy the backend project

### Custom Domain (Optional)

If you want to use custom domains:

1. In the Vercel dashboard, go to your project
2. Click on "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify that environment variables are correctly set in Vercel
   - Ensure the backend URL in the frontend code matches your deployed backend
   - Check Vercel logs for error messages

2. **CORS Errors**
   - The backend is already configured to handle CORS
   - If issues persist, check the Vercel deployment URLs

3. **Environment Variables Not Working**
   - Ensure variables are added in the Vercel dashboard, not just locally
   - Redeploy after adding environment variables

### Checking Deployment Status

1. View logs in the Vercel dashboard
2. Use Vercel CLI to check logs:
   ```bash
   vercel logs your-project-name
   ```

## Redeployment

To redeploy after making changes:

### Backend
```bash
cd flex-reviews-backend
vercel --prod
```

### Frontend
```bash
cd flex-reviews-frontend
vercel --prod
```

## Conclusion

Your Flex Reviews Dashboard should now be deployed and accessible at your Vercel URLs. The frontend will communicate with the backend API to provide a complete reviews management solution.

Remember to:
- Keep your API keys secure
- Monitor your Vercel usage
- Regularly update dependencies
- Check logs for any issues