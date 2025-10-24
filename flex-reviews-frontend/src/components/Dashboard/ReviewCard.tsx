import React from 'react';
import type { NormalizedReview } from '../../types';

interface Props {
  review: NormalizedReview;
  toggleSelect: (id: number) => void;
  isSelected: boolean;
}

const ReviewCard: React.FC<Props> = ({ review, toggleSelect, isSelected }) => (
  <div className={`bg-white p-6 rounded-lg shadow transition-all duration-200 hover:shadow-lg ${isSelected ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-semibold text-lg truncate">{review.listingName}</h4>
      <input 
        type="checkbox" 
        checked={isSelected} 
        onChange={() => toggleSelect(review.id)} 
        className="ml-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
      />
    </div>
    
    <div className="mb-3">
      <p className="text-gray-700 font-medium">{review.guestName}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          {review.dateBucket}
        </span>
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          {review.channel}
        </span>
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          {review.type}
        </span>
        {review.status && (
          <span className={`inline-block text-xs px-2 py-1 rounded ${
            review.status === 'published' ? 'bg-green-100 text-green-800' : 
            review.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {review.status}
          </span>
        )}
      </div>
    </div>
    
    <div className="mb-3">
      <p className="font-medium">
        Rating: 
        <span className={`ml-2 text-lg ${
          (review.overallRating || 0) >= 8 ? 'text-green-600' :
          (review.overallRating || 0) >= 6 ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          {review.overallRating !== null ? `${review.overallRating}/10` : 'N/A'}
        </span>
      </p>
    </div>
    
    <p className="italic text-gray-700 mb-3">"{review.publicReview}"</p>
    
    {/* Category ratings */}
    {review.categories.length > 0 && (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Category Ratings:</h5>
        <div className="flex flex-wrap gap-2">
          {review.categories.map((cat, index) => (
            <span 
              key={index} 
              className={`inline-block text-xs px-2 py-1 rounded ${
                cat.rating >= 8 ? 'bg-green-100 text-green-800' :
                cat.rating >= 6 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {cat.category}: {cat.rating}
            </span>
          ))}
        </div>
      </div>
    )}
    
    {/* Submitted date */}
    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
      Submitted: {new Date(review.submittedAt).toLocaleDateString()}
    </div>
  </div>
);

export default ReviewCard;