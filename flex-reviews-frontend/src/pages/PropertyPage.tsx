import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { NormalizedReview, Property } from "../types";
import PropertyDetails from "../components/PropertyPage/PropertyDetails";
import SelectedReviews from "../components/PropertyPage/SelectedReviews";
import {
  FiLoader,
  FiStar,
  FiTrendingUp,
  FiBarChart2,
  FiHome,
} from "react-icons/fi";
import { API_BASE } from "../config/api.config";

const PropertyPage: React.FC = () => {
  const { listingName } = useParams<{ listingName: string }>();
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"all" | "positive" | "recent">(
    "all"
  );

  useEffect(() => {
    fetchData();
  }, [listingName]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: reviewsData } = await axios.get(
        `${API_BASE}/api/reviews/hostaway`
      );
      const propertyReviews = reviewsData.reviews.filter(
        (review: NormalizedReview) =>
          review.listingName === decodeURIComponent(listingName || "")
      );

      const { data: selectedData } = await axios.get(
        `${API_BASE}/api/reviews/selected/${encodeURIComponent(listingName || "")}`
      );
      const selectedReviewIds = new Set(selectedData.reviewIds);

      const selectedReviews = propertyReviews.filter(
        (review: NormalizedReview) => selectedReviewIds.has(review.id)
      );

      setReviews(selectedReviews);

      setProperty({
        name: decodeURIComponent(listingName || ""),
        description:
          "An exquisite urban sanctuary blending modern elegance with timeless comfort. Perfect for discerning travelers seeking sophistication.",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        amenities: [
          "High-Speed WiFi",
          "Smart AC",
          "Gourmet Kitchen",
          "Rooftop View",
        ],
      });
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping absolute opacity-20"></div>
            <FiLoader className="animate-spin h-16 w-16 text-indigo-600 mx-auto relative z-10" />
          </div>
          <p className="text-xl font-bold text-indigo-800 mt-6">
            Loading Property Insights
          </p>
          <p className="text-indigo-600 mt-2">Analyzing guest experiences...</p>
        </div>
      </div>
    );
  }

  const filteredReviews =
    selectedTab === "all"
      ? reviews
      : selectedTab === "positive"
      ? reviews.filter((r) => (r.overallRating || 0) >= 8)
      : reviews.filter(
          (r) =>
            new Date(r.submittedAt) >
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );

  // Calculate property stats
  const propertyStats = {
    totalReviews: reviews.length,
    avgRating:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + (r.overallRating || 0), 0) /
            reviews.length
          ).toFixed(1)
        : "N/A",
    positiveReviews: reviews.filter((r) => (r.overallRating || 0) >= 8).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="modern-dashboard-header">
        <div className="modern-dashboard-header-content">
          <div>
            <h1 className="modern-dashboard-title flex items-center gap-3">
              <FiHome className="text-indigo-600" />
              {property?.name || "Property Details"}
            </h1>
            <p className="modern-dashboard-subtitle">
              Detailed insights and guest reviews for this property
            </p>
          </div>
          <div className="modern-dashboard-stats">
            <div className="modern-dashboard-stat-badge">
              <FiBarChart2 className="text-indigo-600" />
              <span>{propertyStats.totalReviews} Reviews</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Property Details */}
        {property && <PropertyDetails property={property} />}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="modern-stat-card bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="modern-stat-card-icon bg-white/20">
              <FiBarChart2 />
            </div>
            <div className="modern-stat-card-value">
              {propertyStats.totalReviews}
            </div>
            <div className="modern-stat-card-title">Total Reviews</div>
          </div>

          <div className="modern-stat-card bg-gradient-to-br from-amber-500 to-orange-500">
            <div className="modern-stat-card-icon bg-white/20">
              <FiStar />
            </div>
            <div className="modern-stat-card-value">
              {propertyStats.avgRating}
            </div>
            <div className="modern-stat-card-title">Average Rating</div>
          </div>

          <div className="modern-stat-card bg-gradient-to-br from-green-500 to-emerald-600">
            <div className="modern-stat-card-icon bg-white/20">
              <FiTrendingUp />
            </div>
            <div className="modern-stat-card-value">
              {propertyStats.totalReviews > 0
                ? Math.round(
                    (propertyStats.positiveReviews /
                      propertyStats.totalReviews) *
                      100
                  )
                : 0}
              %
            </div>
            <div className="modern-stat-card-title">Positive Reviews</div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="modern-action-card">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["all", "positive", "recent"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-indigo-50"
                }`}
              >
                {tab === "all"
                  ? "All Reviews"
                  : tab === "positive"
                  ? "Top Rated"
                  : "Recent"}
              </button>
            ))}
          </div>

          {/* Selected Reviews */}
          <div className="mt-6">
            <SelectedReviews reviews={filteredReviews} />
            {filteredReviews.length === 0 && (
              <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
                <FiStar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No Reviews in This Category
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  There are no reviews matching your current filter. Try
                  selecting a different category.
                </p>
                <button
                  onClick={() => setSelectedTab("all")}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-800 transition-all"
                >
                  View All Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyPage;
