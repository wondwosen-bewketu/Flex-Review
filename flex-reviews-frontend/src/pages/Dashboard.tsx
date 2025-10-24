import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { NormalizedReview } from '../types';

const API_BASE = 'http://localhost:3000';

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    let result = reviews;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(review => 
        review.listingName.toLowerCase().includes(term) ||
        review.guestName.toLowerCase().includes(term) ||
        review.publicReview.toLowerCase().includes(term)
      );
    }
    
    // Apply rating filter
    if (ratingFilter !== null) {
      result = result.filter(review => 
        review.overallRating !== null && review.overallRating >= ratingFilter
      );
    }
    
    setFilteredReviews(result);
  }, [reviews, searchTerm, ratingFilter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/api/reviews/hostaway`);
      setReviews(data.reviews);
      setFilteredReviews(data.reviews);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRatingFilter(null);
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
      avgRating: avgRating.toFixed(1),
      positivePercentage: totalReviews > 0 ? Math.round((positiveReviews / totalReviews) * 100) : 0,
      negativePercentage: totalReviews > 0 ? Math.round((negativeReviews / totalReviews) * 100) : 0
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <span className="ml-4 text-xl text-gray-700">Loading premium reviews...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Error Loading Reviews</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchReviews}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Premium Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Premium Reviews Dashboard</h1>
            <p className="mt-2 text-indigo-100">Professional insights for property performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-700 shadow-lg'
                  : 'bg-indigo-800 text-white hover:bg-indigo-900'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-700 shadow-lg'
                  : 'bg-indigo-800 text-white hover:bg-indigo-900'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Total Reviews</p>
            <p className="text-2xl font-bold mt-1">{stats.totalReviews}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Average Rating</p>
            <p className="text-2xl font-bold mt-1">{stats.avgRating}/10</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Positive Reviews</p>
            <p className="text-2xl font-bold mt-1">{stats.positivePercentage}%</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-200 text-sm">Needs Attention</p>
            <p className="text-2xl font-bold mt-1">{stats.negativePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Premium Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filter Reviews</h2>
          <p className="mt-2 md:mt-0 text-sm text-gray-500">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Reviews
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                placeholder="Search by property, guest, or review content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <select
              id="rating"
              value={ratingFilter === null ? '' : ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="">All Ratings</option>
              <option value="9">9+ Stars</option>
              <option value="8">8+ Stars</option>
              <option value="7">7+ Stars</option>
              <option value="6">6+ Stars</option>
              <option value="5">5+ Stars</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Premium Content */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review, index) => (
                    <tr 
                      key={review.id} 
                      className={`hover:bg-gray-50 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{review.listingName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-800">
                              {review.guestName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{review.guestName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            (review.overallRating || 0) >= 8 ? 'bg-green-100' :
                            (review.overallRating || 0) >= 6 ? 'bg-yellow-100' :
                            'bg-red-100'
                          }`}>
                            <span className={`text-sm font-bold ${
                              (review.overallRating || 0) >= 8 ? 'text-green-800' :
                              (review.overallRating || 0) >= 6 ? 'text-yellow-800' :
                              'text-red-800'
                            }`}>
                              {review.overallRating !== null ? review.overallRating : 'N/A'}
                            </span>
                          </div>
                          <div className="ml-2">
                            <div className="text-xs text-gray-500">Stars</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-900 max-w-xs truncate font-medium" title={review.publicReview}>
                          "{review.publicReview}"
                        </div>
                        {review.categories.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {review.categories.slice(0, 2).map((category, idx) => (
                              <span 
                                key={idx} 
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {category.category}
                              </span>
                            ))}
                            {review.categories.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                +{review.categories.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {new Date(review.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {review.dateBucket}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          review.status === 'published' ? 'bg-green-100 text-green-800' :
                          review.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 truncate">{review.listingName}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-800">
                            {review.guestName.charAt(0)}
                          </span>
                        </div>
                        <p className="ml-2 text-sm font-medium text-gray-700">{review.guestName}</p>
                      </div>
                    </div>
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
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-700 text-sm line-clamp-3">"{review.publicReview}"</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {review.categories.slice(0, 3).map((category, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {category.category}: {category.rating}
                      </span>
                    ))}
                    {review.categories.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{review.categories.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(review.submittedAt).toLocaleDateString()}
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
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="flex flex-col items-center justify-center">
                <svg className="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;