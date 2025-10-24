import React from 'react';
import type { NormalizedReview } from '../../types';

interface Props {
  reviews: NormalizedReview[];
}

const SelectedReviews: React.FC<Props> = ({ reviews }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Guest Reviews</h2>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {reviews.length} reviews
      </span>
    </div>
    
    {reviews.length > 0 ? (
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="italic text-gray-700 mb-3">"{review.publicReview}"</p>
                <p className="font-medium text-gray-900">- {review.guestName}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  (review.overallRating || 0) >= 8 ? 'bg-green-100 text-green-800' :
                  (review.overallRating || 0) >= 6 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {review.overallRating !== null ? `${review.overallRating}/10` : 'N/A'}
                </span>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Category ratings */}
            {review.categories.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Detailed Ratings:</h5>
                <div className="flex flex-wrap gap-2">
                  {review.categories.map((cat, index) => (
                    <span 
                      key={index} 
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        cat.rating >= 8 ? 'bg-green-100 text-green-800' :
                        cat.rating >= 6 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {cat.category}: {cat.rating}/10
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-500">
          This property doesn't have any selected reviews yet. Check back later!
        </p>
      </div>
    )}
  </section>
);

export default SelectedReviews;