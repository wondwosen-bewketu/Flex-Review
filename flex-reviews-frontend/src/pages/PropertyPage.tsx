import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { NormalizedReview } from '../types';

const API_BASE = 'http://localhost:3000';

const PropertyPage: React.FC = () => {
  const { listingName } = useParams<{ listingName: string }>();
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [listingName]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/api/reviews/hostaway`);
      // Filter reviews for this specific property
      const propertyReviews = data.reviews.filter(
        (review: NormalizedReview) => review.listingName === decodeURIComponent(listingName || '')
      );
      setReviews(propertyReviews);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + (review.overallRating || 0), 0) / totalReviews
      : 0;
    
    const positiveReviews = reviews.filter(review => (review.overallRating || 0) >= 8).length;
    const negativeReviews = reviews.filter(review => (review.overallRating || 0) < 6).length;
    
    return {
      totalReviews,
      avgRating: avgRating, // Keep as number
      avgRatingDisplay: avgRating.toFixed(1), // For display
      positivePercentage: totalReviews > 0 ? Math.round((positiveReviews / totalReviews) * 100) : 0,
      negativePercentage: totalReviews > 0 ? Math.round((negativeReviews / totalReviews) * 100) : 0
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <span className="ml-4 text-xl text-gray-700">Loading property details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Premium Property Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center text-indigo-200 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-bold">
              {decodeURIComponent(listingName || 'Property Reviews')}
            </h1>
            <p className="mt-2 text-indigo-100">Guest feedback and performance insights</p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {stats.avgRatingDisplay}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-indigo-200">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.totalReviews} Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Positive Reviews</p>
            <p className="text-2xl font-bold mt-1">{stats.positivePercentage}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full" 
                style={{ width: `${stats.positivePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Needs Attention</p>
            <p className="text-2xl font-bold mt-1">{stats.negativePercentage}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full" 
                style={{ width: `${stats.negativePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Performance</p>
            <p className="text-2xl font-bold mt-1">
              {stats.avgRating >= 8 ? 'Excellent' : 
               stats.avgRating >= 6 ? 'Good' : 'Needs Work'}
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  stats.avgRating >= 8 ? 'bg-green-400' : 
                  stats.avgRating >= 6 ? 'bg-yellow-400' : 'bg-red-400'
                }`} 
                style={{ width: `${(stats.avgRating / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Reviews Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Guest Reviews
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Feedback from guests who stayed at this property
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="px-6 py-6 hover:bg-gray-50 transition-all">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-12 w-12 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-indigo-800">
                        {review.guestName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {review.guestName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(review.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          (review.overallRating || 0) >= 8 ? 'bg-green-100' :
                          (review.overallRating || 0) >= 6 ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          <span className={`text-base font-bold ${
                            (review.overallRating || 0) >= 8 ? 'text-green-800' :
                            (review.overallRating || 0) >= 6 ? 'text-yellow-800' :
                            'text-red-800'
                          }`}>
                            {review.overallRating !== null ? review.overallRating : 'N/A'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            review.status === 'published' ? 'bg-green-100 text-green-800' :
                            review.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-indigo-100 text-indigo-800">
                            {review.channel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-700">"{review.publicReview}"</p>
                    </div>
                    {review.categories.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Detailed Ratings</h4>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {review.categories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                              <span className="text-sm text-gray-700">{category.category}</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-2">
                                  {category.rating}/10
                                </span>
                                <div className={`h-2 w-16 rounded-full ${
                                  category.rating >= 8 ? 'bg-green-200' :
                                  category.rating >= 6 ? 'bg-yellow-200' :
                                  'bg-red-200'
                                }`}>
                                  <div 
                                    className={`h-2 rounded-full ${
                                      category.rating >= 8 ? 'bg-green-500' :
                                      category.rating >= 6 ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${category.rating * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                This property doesn't have any reviews yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;