import React from 'react';
import type { NormalizedReview } from '../../types';
import {
  FiStar,
  FiUser,
  FiCalendar,
  FiGlobe,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

interface Props {
  review: NormalizedReview;
  toggleSelect: (id: number) => void;
  isSelected: boolean;
}

const ReviewCard: React.FC<Props> = ({ review, toggleSelect, isSelected }) => (
  <div
    className={`bg-white rounded-xl shadow-sm overflow-hidden border transition-all ${
      isSelected
        ? "border-blue-500 ring-2 ring-blue-100"
        : "border-slate-200 hover:border-slate-300"
    }`}
  >
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-slate-900 truncate hover:text-blue-600">
            {review.listingName}
          </h4>
          <div className="flex items-center mt-1 text-xs text-slate-600">
            <FiUser className="mr-1.5 w-3 h-3" />
            <span className="truncate">{review.guestName}</span>
          </div>
        </div>
        <div className="ml-2 flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelect(review.id)}
            className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Rating Badge */}
      <div className="mb-4">
        <div
          className={`inline-flex items-center px-3 py-1.5 rounded-full font-semibold text-xs ${
            (review.overallRating || 0) >= 8
              ? "bg-green-100 text-green-800"
              : (review.overallRating || 0) >= 6
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <FiStar className="mr-1 w-3 h-3" />
          {review.overallRating !== null ? `${review.overallRating}/10` : "N/A"}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-slate-700 mb-4 text-sm leading-relaxed line-clamp-3">
        "{review.publicReview}"
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          <FiCalendar className="mr-1 w-3 h-3" />
          {review.dateBucket}
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
          <FiGlobe className="mr-1 w-3 h-3" />
          {review.channel}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            review.status === "published"
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {review.status === "published" ? (
            <FiCheckCircle className="mr-1 w-3 h-3" />
          ) : (
            <FiClock className="mr-1 w-3 h-3" />
          )}
          {review.status}
        </span>
      </div>

      {/* Category Highlights */}
      {review.categories.length > 0 && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-slate-700">Top Categories</span>
            <span className="text-slate-500">Rating</span>
          </div>
          {review.categories.slice(0, 2).map((cat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-xs text-slate-600 truncate max-w-[90px]">
                {cat.category.replace("_", " ")}
              </span>
              <div className="flex items-center">
                <span className="text-xs font-semibold text-slate-900 mr-2">
                  {cat.rating}/10
                </span>
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cat.rating >= 8
                        ? "bg-green-500"
                        : cat.rating >= 6
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${cat.rating * 10}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
        <span>
          {new Date(review.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <div className="flex items-center text-blue-600 hover:text-blue-800">
          <span className="font-medium">Details</span>
          <FiTrendingUp className="ml-1 w-3 h-3" />
        </div>
      </div>
    </div>
  </div>
);

export default ReviewCard;