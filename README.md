# Flex Living - Developer Assessment

## Project Overview

This is a full-stack web application built as part of the Flex Living developer assessment. The application provides a comprehensive dashboard for property managers to monitor and analyze guest reviews, as well as a public-facing property page to display selected reviews.

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework for building efficient, reliable and scalable server-side applications
- **TypeScript** - Strongly typed programming language

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **TypeScript** - Strongly typed programming language
- **Tailwind CSS** - Utility-first CSS framework

## Key Features

### 1. Hostaway Integration (Mocked)
- Integration with the Hostaway Reviews API (mocked for demonstration)
- Realistic review data parsing and normalization
- Reviews grouped by listing, review type, channel, and date

### 2. Manager Dashboard
- User-friendly, modern dashboard interface
- Filter or sort by rating, category, channel, or time
- Spot trends or recurring issues
- Select which reviews should be displayed on the public website
- Property performance metrics

### 3. Review Display Page
- Replicates the Flex Living website property details layout
- Dedicated section to display selected guest reviews
- Reviews displayed only if approved/selected by the manager in the dashboard

### 4. Google Reviews (Exploration)
- Implementation of basic Google Reviews integration (mocked)
- Documentation of findings for production implementation

## API Endpoints

### Hostaway Reviews
```
GET /api/reviews/hostaway
```
Returns normalized array of reviews from Hostaway.

### Google Reviews
```
GET /api/reviews/google?listingId=:listingId
```
Returns Google reviews for a specific listing (mocked).

### Review Selection
```
POST /api/reviews/selected
```
Saves selected review IDs for a specific property.

```
GET /api/reviews/selected/:listingName
```
Returns selected review IDs for a specific listing.

## Project Structure

### Backend
```
flex-reviews-backend/
├── src/
│   ├── reviews/
│   │   ├── dto/
│   │   ├── reviews.controller.ts
│   │   ├── reviews.module.ts
│   │   └── reviews.service.ts
│   ├── app.module.ts
│   └── main.ts
```

### Frontend
```
flex-reviews-frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Filters.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   └── ReviewsTable.tsx
│   │   └── PropertyPage/
│   │       ├── PropertyDetails.tsx
│   │       └── SelectedReviews.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── PropertyPage.tsx
│   ├── App.tsx
│   └── types.ts
```

## Key Design Decisions

### Review Normalization
- Added `channel` ('hostaway') and `dateBucket` for bucketing
- Date buckets: 'recent' (last 30 days), 'past-month' (30-90 days), 'older' (90+ days)
- Groups enable per-property views and trend analysis

### UI/UX Design
- Clean, intuitive dashboard with table/card toggle
- Comprehensive filtering capabilities
- Visual indicators for ratings and statuses
- Property performance metrics with category breakdowns
- Trend identification and alerts for issues

### Review Selection
- Backend persistence for selected reviews using in-memory storage
- In production, this would be replaced with database storage
- Frontend fallback to localStorage for offline support

### Google Reviews Integration
- Feasible via Google Places API (fetch reviews by place_id)
- Requires API key and billing account
- Implementation limited to 5 reviews per place with rate limits
- Mocked implementation provided for demonstration

## Setup and Run Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Backend Setup
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

4. The backend will be running on http://localhost:3000

### Frontend Setup
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

4. The frontend will be running on http://localhost:5173 (or next available port)

## Deployment

Both the frontend and backend can be deployed to Vercel:

### Prerequisites
1. Create accounts on [Vercel](https://vercel.com/) (free tier available)
2. Install Vercel CLI: `npm install -g vercel`
3. Login to Vercel CLI: `vercel login`

### Backend Deployment (NestJS API)
1. Navigate to the backend directory:
   ```bash
   cd flex-reviews-backend
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your deployment:
   - Set up and deploy to Vercel
   - Choose the default settings
   - Set environment variables in the Vercel dashboard:
     - `HOSTAWAY_ACCOUNT_ID` = your_account_id
     - `HOSTAWAY_API_KEY` = your_api_key
     - `GOOGLE_PLACES_API_KEY` = your_google_api_key (optional)

4. Deploy to production:
   ```bash
   vercel --prod
   ```

### Frontend Deployment (React Dashboard)
1. Update the API base URL in the frontend code:
   - Open `flex-reviews-frontend/src/pages/Dashboard.tsx`
   - Replace `const API_BASE = "http://localhost:3000";` with your deployed backend URL

2. Navigate to the frontend directory:
   ```bash
   cd flex-reviews-frontend
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

### Environment Variables
Set these environment variables in the Vercel dashboard for the backend:
- `HOSTAWAY_ACCOUNT_ID` - Your Hostaway account ID
- `HOSTAWAY_API_KEY` - Your Hostaway API key
- `GOOGLE_PLACES_API_KEY` - Your Google Places API key (optional)

## Evaluation Criteria Addressed

### Handling and Normalization of Real-World JSON Review Data
- Implemented comprehensive data normalization in the ReviewsService
- Added channel information and date bucketing for better data organization

### Code Clarity and Structure
- Well-organized project structure following NestJS and React best practices
- Clear separation of concerns with modular components
- Comprehensive TypeScript typing for better code maintainability

### UX/UI Design Quality and Decision-Making
- Modern, responsive UI built with Tailwind CSS
- Comprehensive filtering and sorting capabilities
- Visual indicators for ratings and statuses
- Trend identification and alerts

### Insightfulness of Dashboard Features
- Property performance metrics with category breakdowns
- Trend identification for low ratings and recent issues
- Visual category performance indicators
- Comprehensive property comparison capabilities

### Problem-Solving Initiative for Undefined Requirements
- Implemented Google Reviews integration with documentation of production requirements
- Added trend detection and alerting features
- Created comprehensive property performance metrics
- Developed a clean, intuitive UI with multiple view options

## Future Improvements

1. **Authentication and Authorization**
   - Implement user authentication for manager access
   - Role-based access control for different user types

2. **Database Integration**
   - Replace in-memory storage with a proper database solution
   - Implement review selection persistence on the backend

3. **Real API Integration**
   - Replace mocked Hostaway data with real API calls
   - Implement production-ready Google Reviews integration

4. **Advanced Analytics**
   - Add charts and graphs for better data visualization
   - Implement predictive analytics for issue detection

5. **Notification System**
   - Email/SMS notifications for significant trends
   - Automated alerts for property managers

## Documentation

- [Deployment Guide](DEPLOYMENT.md) - Instructions for deploying to production
- [Usage Guide](USAGE.md) - How to use the application effectively
- [Deployment Instructions](DEPLOYMENT_INSTRUCTIONS.md) - Step-by-step deployment guide

## Conclusion

This implementation demonstrates a thoughtful approach to building a full-stack application that meets the requirements of the Flex Living assessment. The application is well-structured, user-friendly, and provides valuable insights for property managers while maintaining a clean, professional interface for guests.