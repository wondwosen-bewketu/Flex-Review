import React from 'react';
import type { NormalizedReview } from '../../types';

interface Props {
  reviews: NormalizedReview[];
  toggleSelect: (id: number) => void;
  selected: Set<number>;
}

const ReviewsTable: React.FC<Props> = ({ reviews, toggleSelect, selected }) => (
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {reviews.map(review => (
          <tr key={review.id} className={`hover:bg-gray-50 ${selected.has(review.id) ? 'bg-blue-50' : ''}`}>
            <td className="px-6 py-4 whitespace-nowrap">
              <input 
                type="checkbox" 
                checked={selected.has(review.id)} 
                onChange={() => toggleSelect(review.id)} 
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{review.listingName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{review.guestName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                (review.overallRating || 0) >= 8 ? 'bg-green-100 text-green-800' :
                (review.overallRating || 0) >= 6 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {review.overallRating !== null ? review.overallRating : 'N/A'}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900 max-w-xs truncate" title={review.publicReview}>
                "{review.publicReview}"
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{review.dateBucket}</div>
              <div className="text-xs text-gray-400">
                {new Date(review.submittedAt).toLocaleDateString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {review.channel}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                review.status === 'published' ? 'bg-green-100 text-green-800' : 
                review.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {review.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReviewsTable;