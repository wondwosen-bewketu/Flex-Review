import React, { useState } from "react";
import type { NormalizedReview } from "../../types";
import {
  FiStar,
  FiCalendar,
  FiGlobe,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

interface Props {
  reviews: NormalizedReview[];
}

const SelectedReviews: React.FC<Props> = ({ reviews }) => {
  const [selectedReview, setSelectedReview] = useState<NormalizedReview | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReviewModal = (review: NormalizedReview) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Function to get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <FiClock className="mr-1" />
            Draft
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            <FiAlertTriangle className="mr-1" />
            {status}
          </span>
        );
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
      <div className="bg-white p-6 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <FiStar className="mr-3 text-amber-400" />
            Featured Guest Reviews
          </h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
            {reviews.length} Curated
          </span>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className={`p-6 transition-all duration-200 hover:bg-slate-50 cursor-pointer ${
                index !== 0 ? "pt-6" : ""
              }`}
              onClick={() => openReviewModal(review)}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                {/* Rating Visual */}
                <div className="md:col-span-1 text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-lg font-bold ${
                      (review.overallRating || 0) >= 8
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                        : (review.overallRating || 0) >= 6
                        ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                        : "bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    }`}
                  >
                    {review.overallRating || "N/A"}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Overall Rating</p>

                  {/* Status Badge */}
                  <div className="mt-3">{getStatusBadge(review.status)}</div>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg">
                        {review.guestName || "Anonymous Guest"}
                      </h4>
                      <p className="text-sm text-slate-500 flex items-center mt-1">
                        <FiCalendar className="mr-1" />
                        {review.submittedAt
                          ? new Date(review.submittedAt).toLocaleDateString()
                          : "Unknown Date"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        <FiGlobe className="mr-1" />
                        {review.channel || "Unknown"}
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        {review.dateBucket || "Unknown Period"}
                      </span>
                    </div>
                  </div>

                  <blockquote className="text-lg italic text-slate-700 mb-5 line-clamp-3">
                    "{review.publicReview || "No review content provided"}"
                  </blockquote>

                  {/* Categories */}
                  {review.categories.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {review.categories.map((cat, cIndex) => (
                        <div
                          key={cIndex}
                          className="text-center p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-100 shadow-sm"
                        >
                          <p className="text-sm font-medium text-slate-900 capitalize">
                            {cat.category.replace("_", " ")}
                          </p>
                          <div className="flex items-center justify-center mt-1">
                            <div className="flex -space-x-1 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.round(cat.rating / 2)
                                      ? "text-amber-400 fill-current"
                                      : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-600">
                              ({cat.rating}/10)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6">
          <FiStar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Featured Reviews Yet
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Select standout reviews in the dashboard to showcase here. Elevate
            your property's story!
          </p>
          <button className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-800 transition-all">
            Go to Dashboard
          </button>
        </div>
      )}

      {/* Review Detail Modal */}
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  Review Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${
                      (selectedReview.overallRating || 0) >= 8
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                        : (selectedReview.overallRating || 0) >= 6
                        ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                        : "bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    }`}
                  >
                    {selectedReview.overallRating || "N/A"}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-xl text-slate-900">
                      {selectedReview.guestName || "Anonymous Guest"}
                    </h4>
                    <p className="text-slate-500 flex items-center">
                      <FiCalendar className="mr-1" />
                      {selectedReview.submittedAt
                        ? new Date(
                            selectedReview.submittedAt
                          ).toLocaleDateString()
                        : "Unknown Date"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {getStatusBadge(selectedReview.status)}
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedReview.channel || "Unknown Channel"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="font-bold text-slate-900 mb-2">
                  Review Content
                </h5>
                <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                  "{selectedReview.publicReview || "No review content provided"}
                  "
                </p>
              </div>

              {selectedReview.categories.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-bold text-slate-900 mb-3">
                    Category Ratings
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedReview.categories.map((cat, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white border border-slate-200 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-slate-900 capitalize">
                            {cat.category.replace("_", " ")}
                          </span>
                          <span className="text-sm font-bold text-slate-700">
                            {cat.rating}/10
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex -space-x-1 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(cat.rating / 2)
                                    ? "text-amber-400 fill-current"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedReviews;
