# Deployment Guide

This document provides instructions for deploying the Flex Reviews Dashboard application to production environments.

## Architecture Overview

The application consists of two main components:
1. **Backend API** - NestJS application that fetches and normalizes review data
2. **Frontend Dashboard** - React application that provides the user interface

## Prerequisites

- Node.js 14+
- npm or yarn
- Git
- A hosting platform (Vercel recommended)

## Backend Deployment

### Environment Variables

Create a `.env` file in the `flex-reviews-backend` directory with the following variables:

```env
HOSTAWAY_ACCOUNT_ID=your_hostaway_account_id
HOSTAWAY_API_KEY=your_hostaway_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
PORT=3000
```

### Local Development

1. Navigate to the backend directory:
   ```bash
   cd flex-reviews-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

### Deployment to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the backend:
   ```bash
   cd flex-reviews-backend
   vercel
   ```

3. Follow the prompts to configure your deployment:
   - Set up and deploy to Vercel
   - Choose the default settings
   - Set environment variables in the Vercel dashboard

## Frontend Deployment

### Environment Configuration

Update the `API_BASE` constant in `flex-reviews-frontend/src/pages/Dashboard.tsx` and `flex-reviews-frontend/src/pages/PropertyPage.tsx` to point to your deployed backend URL:

```typescript
const API_BASE = 'https://your-backend-url.vercel.app'; // Replace with your actual backend URL
```

### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd flex-reviews-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

### Deployment to Vercel

1. Deploy the frontend:
   ```bash
   cd flex-reviews-frontend
   vercel
   ```

2. Follow the prompts to configure your deployment:
   - Set up and deploy to Vercel
   - Choose the default settings
   - The build command will be automatically detected

## Google Reviews Integration

To enable real Google Reviews integration:

1. Obtain a Google Places API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Places API for your project
3. Update the `GOOGLE_PLACES_API_KEY` environment variable in your backend
4. Replace the mock implementation in `ReviewsService.fetchGoogleReviews()` with the real API call:

```typescript
const response = await axios.get(`${this.GOOGLE_PLACES_API_BASE}/details/json`, {
  params: {
    place_id: placeId,
    fields: 'reviews',
    key: this.GOOGLE_PLACES_API_KEY
  }
});
return response.data.result.reviews || [];
```

## Monitoring and Maintenance

### Health Checks

The backend provides a health check endpoint at `/` that returns a simple "Hello World!" message.

### Logging

All API requests and errors are logged to the console. In production, consider implementing structured logging.

### Error Handling

The application includes basic error handling for API failures. Review the logs regularly to identify and address issues.

## Scaling Considerations

### Database

For production use, replace the localStorage-based review selection with a proper database solution:
- PostgreSQL or MongoDB for storing selected reviews
- Redis for caching frequently accessed data

### Caching

Implement caching for:
- Hostaway API responses (15-30 minute cache)
- Google Reviews data (1 hour cache)
- Property performance metrics (5 minute cache)

### Load Balancing

For high-traffic deployments, consider:
- Multiple backend instances behind a load balancer
- CDN for frontend assets
- Database connection pooling

## Security Considerations

### API Keys

- Store API keys as environment variables, not in source code
- Use different keys for development and production
- Rotate keys regularly

### CORS

The backend includes basic CORS configuration. For production, restrict origins to your frontend domain:

```typescript
// In main.ts
app.enableCors({
  origin: 'https://your-frontend-domain.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

### Rate Limiting

Implement rate limiting to prevent abuse:
- Per-IP request limits
- Per-user request limits for authenticated endpoints

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify API keys are correct
   - Check network connectivity
   - Ensure the backend can reach external APIs

2. **CORS Errors**
   - Verify CORS configuration in the backend
   - Check that the frontend is making requests to the correct backend URL

3. **Performance Issues**
   - Implement caching for external API responses
   - Add database indexing for frequently queried fields
   - Consider pagination for large datasets

### Getting Help

For issues not covered in this guide:
- Check the application logs for error messages
- Review the GitHub repository issues
- Contact the Flex Living development team

## Conclusion

This deployment guide covers the essential steps for getting the Flex Reviews Dashboard application running in production. Remember to:
- Secure your API keys
- Monitor application performance
- Regularly update dependencies
- Test thoroughly before deploying changes