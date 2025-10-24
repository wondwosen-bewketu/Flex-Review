import React, { useState } from "react";
import type { NormalizedReview } from "../../types";
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiGlobe,
  FiStar,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiEye,
  FiCalendar,
} from "react-icons/fi";

interface Props {
  reviews: NormalizedReview[];
  toggleSelect: (id: number) => void;
  selected: Set<number>;
}

const ReviewsTable: React.FC<Props> = ({ reviews, toggleSelect, selected }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof NormalizedReview;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedReview, setSelectedReview] = useState<NormalizedReview | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (key: keyof NormalizedReview) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortedReviews = () => {
    if (!sortConfig) return reviews;
    return [...reviews].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? "";
      const bVal = b[sortConfig.key] ?? "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedReviews = getSortedReviews();

  const getSortIcon = (key: keyof NormalizedReview) =>
    !sortConfig || sortConfig.key !== key ? (
      <FiChevronUp className="ml-1 text-slate-400" />
    ) : sortConfig.direction === "asc" ? (
      <FiChevronUp className="ml-1 text-slate-800" />
    ) : (
      <FiChevronDown className="ml-1 text-slate-800" />
    );

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Function to open review modal
  const openReviewModal = (review: NormalizedReview) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Function to get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
            <FiCheckCircle className="w-3 h-3 mr-1" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <FiClock className="w-3 h-3 mr-1" />
            Draft
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            <FiAlertTriangle className="w-3 h-3 mr-1" />
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <div className="modern-table-container">
        <table className="modern-table">
          <thead className="modern-table-header">
            <tr>
              {[
                { label: "Select", key: "id" },
                { label: "Property", key: "listingName" },
                { label: "Guest", key: "guestName" },
                { label: "Rating", key: "overallRating" },
                { label: "Review", key: "publicReview" },
                { label: "Date", key: "submittedAt" },
                { label: "Channel", key: "channel" },
                { label: "Status", key: "status" },
                { label: "Actions", key: "" },
              ].map((col, idx) => (
                <th
                  key={idx}
                  onClick={() =>
                    col.key && handleSort(col.key as keyof NormalizedReview)
                  }
                  className={`${
                    col.key ? "cursor-pointer hover:bg-slate-100" : ""
                  }`}
                >
                  <div className="flex items-center">
                    {col.label}
                    {col.key && getSortIcon(col.key as keyof NormalizedReview)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedReviews.map((review) => (
              <tr
                key={review.id}
                className={`modern-table-row ${
                  selected.has(review.id) ? "selected" : ""
                }`}
              >
                <td className="modern-table-cell checkbox">
                  <input
                    type="checkbox"
                    checked={selected.has(review.id)}
                    onChange={() => toggleSelect(review.id)}
                    className="enhanced-checkbox"
                    aria-label={`Select review ${review.id}`}
                  />
                </td>
                <td className="modern-table-cell property">
                  <div className="font-semibold text-slate-800">
                    {truncateText(review.listingName || "Unnamed Property", 25)}
                  </div>
                </td>
                <td className="modern-table-cell">
                  <div className="font-medium text-slate-700">
                    {truncateText(review.guestName || "Anonymous", 20)}
                  </div>
                </td>
                <td className="modern-table-cell rating">
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                      (review.overallRating || 0) >= 8
                        ? "bg-green-100 text-green-800"
                        : (review.overallRating || 0) >= 6
                        ? "bg-amber-100 text-amber-800"
                        : (review.overallRating || 0) > 0
                        ? "bg-red-100 text-red-800"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {review.overallRating !== null ? (
                      <>
                        <FiStar className="w-4 h-4" />
                        <span>{review.overallRating}</span>
                      </>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </td>
                <td className="modern-table-cell max-w-md">
                  <div
                    className="text-slate-600 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    title={review.publicReview}
                    onClick={() => openReviewModal(review)}
                  >
                    "
                    {truncateText(
                      review.publicReview || "No review content",
                      60
                    )}
                    "
                  </div>
                </td>
                <td className="modern-table-cell date">
                  <div className="font-medium text-slate-700">
                    {review.submittedAt
                      ? new Date(review.submittedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {review.dateBucket || "Unknown"}
                  </div>
                </td>
                <td className="modern-table-cell">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                    <FiGlobe className="w-3 h-3 mr-1" />
                    {review.channel || "Unknown"}
                  </span>
                </td>
                <td className="modern-table-cell status">
                  {getStatusBadge(review.status)}
                </td>
                <td className="modern-table-cell">
                  <button
                    onClick={() => openReviewModal(review)}
                    className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                    aria-label="View review details"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reviews.length === 0 && (
          <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-slate-100">
            <FiSearch className="mx-auto h-12 w-12 mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              No reviews found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

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
    </>
  );
};

export default ReviewsTable;
