# Usage Guide

This document provides instructions on how to use the Flex Reviews Dashboard application effectively.

## Getting Started

### Accessing the Dashboard

1. Start both the backend and frontend servers
2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)
3. You will be automatically directed to the Dashboard page

### Dashboard Overview

The Dashboard provides a comprehensive view of all property reviews with the following features:

1. **Filtering and Sorting**
   - Filter reviews by rating, category, channel, and date range
   - Search reviews by keywords
   - Sort reviews by various criteria (date, rating, property, guest)

2. **Review Views**
   - Toggle between table view and card view
   - Select reviews to display on property pages

3. **Trend Analysis**
   - Identify low-rated reviews
   - Spot recent negative reviews
   - Monitor category performance issues

4. **Property Performance**
   - View average ratings per property
   - Analyze category performance
   - See rating distribution

## Using the Dashboard

### Filtering Reviews

Use the filter section at the top of the dashboard to narrow down reviews:

1. **Search**: Enter keywords to search across all review fields
2. **Minimum Rating**: Filter reviews with ratings above a certain threshold
3. **Category**: Filter reviews by specific categories (cleanliness, communication, etc.)
4. **Channel**: Filter reviews by source (Hostaway, Google)
5. **Date Range**: Filter reviews by time period (recent, past month, older)

### Sorting Reviews

Sort reviews using the "Sort By" and "Order" dropdowns:
- Sort by date, rating, property name, or guest name
- Choose ascending or descending order

### Selecting Reviews

1. In either table or card view, use the checkboxes to select reviews
2. Selected reviews will be highlighted
3. Selections are saved automatically and will persist between sessions
4. Selected reviews will appear on the corresponding property pages

### Viewing Property Details

Click the "View Details" link next to any property name to navigate to that property's page, which displays:
- Property information and amenities
- All selected reviews for that property

## Property Page

The Property Page displays:
1. Property details including name, description, and amenities
2. All reviews selected by managers in the dashboard
3. Detailed category ratings for each review

## Best Practices

### Review Management

1. **Regular Monitoring**: Check the dashboard daily for new reviews
2. **Trend Analysis**: Pay attention to the "Identified Trends" section for potential issues
3. **Property Performance**: Use the property performance metrics to identify underperforming properties
4. **Review Selection**: Carefully select which reviews to display publicly to maintain a positive image

### Performance Optimization

1. **Use Filters**: Narrow down large datasets using filters rather than browsing all reviews
2. **Refresh Data**: Click the "Refresh Data" button to fetch the latest reviews from external sources
3. **Clear Filters**: Use the "Clear Filters" button to reset all filters at once

## Troubleshooting

### Common Issues

1. **No Reviews Loading**
   - Check that the backend server is running
   - Verify API keys are correctly configured
   - Check the browser console for error messages

2. **Selections Not Saving**
   - Ensure your browser supports localStorage
   - Check for browser console errors
   - Try refreshing the page

3. **Performance Issues**
   - Use filters to reduce the number of displayed reviews
   - Switch to table view for better performance with large datasets

### Getting Support

If you encounter issues not covered in this guide:
1. Check the browser console for error messages
2. Verify that both backend and frontend servers are running
3. Ensure all environment variables are correctly configured
4. Contact the Flex Living development team for assistance

## Feedback and Improvements

We welcome feedback on the Flex Reviews Dashboard. If you have suggestions for improvements or encounter any issues, please:
1. Document the issue or suggestion
2. Include steps to reproduce (for issues)
3. Submit feedback to the development team

Thank you for using the Flex Reviews Dashboard!