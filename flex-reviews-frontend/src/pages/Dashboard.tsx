import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { NormalizedReview } from "../types";
import {
  FiBarChart,
  FiActivity,
  FiTrendingUp,
  FiAlertCircle,
  FiHome,
  FiDatabase,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api.config";

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/reviews/hostaway`);
      setReviews(data.reviews);
      setError(null);
    } catch {
      setError("Failed to load reviews. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = reviews.length;
    const avg =
      total > 0
        ? reviews.reduce((sum, r) => sum + (r.overallRating || 0), 0) / total
        : 0;
    const positives = reviews.filter((r) => (r.overallRating || 0) >= 8).length;
    const issues = reviews.filter((r) => (r.overallRating || 0) < 6).length;
    const properties = new Set(reviews.map((r) => r.listingName)).size;

    return {
      total,
      avg: avg.toFixed(1),
      positives: Math.round((positives / total) * 100) || 0,
      issues: Math.round((issues / total) * 100) || 0,
      properties,
    };
  }, [reviews]);

  const selectedReviewsCount = (): number => {
    const saved = localStorage.getItem("selectedReviews");
    if (saved) {
      try {
        return JSON.parse(saved).length;
      } catch {
        return 0;
      }
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping absolute opacity-20"></div>
            <FiBarChart className="h-24 w-24 text-indigo-600 mx-auto relative z-10" />
          </div>
          <p className="text-3xl font-bold text-indigo-800 mt-8">
            Loading Dashboard
          </p>
          <p className="text-indigo-600 mt-3 text-lg">
            Preparing your analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white p-14 rounded-3xl shadow-2xl text-center border border-red-100 max-w-md mx-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FiAlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-red-800 mb-4">
            Connection Error
          </h2>
          <p className="text-red-600 mb-8 text-lg">{error}</p>
          <button
            onClick={fetchReviews}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl font-bold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <header className="modern-dashboard-header">
        <div className="modern-dashboard-header-content">
          <div>
            <h1 className="modern-dashboard-title flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <FiHome className="text-indigo-600 text-2xl" />
              </div>
              Reviews Dashboard
            </h1>
            <p className="modern-dashboard-subtitle text-lg">
              Track and manage all your property reviews in one place
            </p>
          </div>
          <div className="modern-dashboard-stats">
            <div className="modern-dashboard-stat-badge px-6 py-3 text-lg">
              <FiDatabase className="text-indigo-600 text-xl" />
              <span className="font-bold">{reviews.length} Reviews</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards - Responsive grid for larger screens, horizontal scroll for smaller */}
        <div className="mb-10">
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Total Reviews",
                value: stats.total,
                icon: <FiBarChart />,
                gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
                onClick: () => navigate("/reviews"),
              },
              {
                title: "High Performers",
                value: `${stats.positives}%`,
                icon: <FiActivity />,
                gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
                onClick: () => navigate("/stats"),
              },
              {
                title: "Avg Rating",
                value: stats.avg,
                icon: <FiTrendingUp />,
                gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
                onClick: () => navigate("/stats"),
              },
              {
                title: "Needs Attention",
                value: `${stats.issues}%`,
                icon: <FiAlertCircle />,
                gradient: "bg-gradient-to-br from-rose-500 to-red-600",
                onClick: () => navigate("/reviews"),
              },
              {
                title: "Properties",
                value: stats.properties,
                icon: <FiHome />,
                gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
                onClick: () => navigate("/properties"),
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="modern-stat-card cursor-pointer transform hover:-translate-y-3 transition-all duration-300"
                onClick={stat.onClick}
              >
                <div
                  className={`modern-stat-card-icon ${stat.gradient} shadow-lg`}
                >
                  {stat.icon}
                </div>
                <div className="modern-stat-card-value">{stat.value}</div>
                <div className="modern-stat-card-title tracking-wider">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal scroll for smaller screens */}
          <div className="md:hidden flex overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex space-x-6 min-w-max">
              {[
                {
                  title: "Total Reviews",
                  value: stats.total,
                  icon: <FiBarChart />,
                  gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
                  onClick: () => navigate("/reviews"),
                },
                {
                  title: "High Performers",
                  value: `${stats.positives}%`,
                  icon: <FiActivity />,
                  gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
                  onClick: () => navigate("/stats"),
                },
                {
                  title: "Avg Rating",
                  value: stats.avg,
                  icon: <FiTrendingUp />,
                  gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
                  onClick: () => navigate("/stats"),
                },
                {
                  title: "Needs Attention",
                  value: `${stats.issues}%`,
                  icon: <FiAlertCircle />,
                  gradient: "bg-gradient-to-br from-rose-500 to-red-600",
                  onClick: () => navigate("/reviews"),
                },
                {
                  title: "Properties",
                  value: stats.properties,
                  icon: <FiHome />,
                  gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
                  onClick: () => navigate("/properties"),
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="modern-stat-card cursor-pointer transform hover:-translate-y-3 transition-all duration-300"
                  onClick={stat.onClick}
                >
                  <div
                    className={`modern-stat-card-icon ${stat.gradient} shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <div className="modern-stat-card-value">{stat.value}</div>
                  <div className="modern-stat-card-title tracking-wider">
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Cards - Responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            className="enhanced-action-card cursor-pointer transform hover:-translate-y-3 transition-all duration-300"
            onClick={() => navigate("/reviews")}
          >
            <h2 className="enhanced-action-card-title">Manage Reviews</h2>
            <p className="enhanced-action-card-description">
              View, filter, and select reviews for public display on property
              pages. Create custom collections for marketing purposes.
            </p>
            <div className="enhanced-action-card-badge">
              <FiDatabase className="text-white" />
              {selectedReviewsCount()} reviews selected
            </div>
          </div>

          <div
            className="enhanced-action-card cursor-pointer transform hover:-translate-y-3 transition-all duration-300"
            onClick={() => navigate("/stats")}
          >
            <h2 className="enhanced-action-card-title">Detailed Analytics</h2>
            <p className="enhanced-action-card-description">
              See comprehensive performance metrics for all reviews. Analyze
              trends, guest satisfaction, and property performance.
            </p>
            <div className="flex items-center text-indigo-600 font-bold mt-4 text-lg">
              <span>View Reports</span>
              <FiTrendingUp className="ml-2" />
            </div>
          </div>

          <div
            className="enhanced-action-card cursor-pointer transform hover:-translate-y-3 transition-all duration-300"
            onClick={() => navigate("/properties")}
          >
            <h2 className="enhanced-action-card-title">Manage Properties</h2>
            <p className="enhanced-action-card-description">
              View and update property information quickly. Track performance
              metrics across your entire portfolio.
            </p>
            <div className="flex items-center text-indigo-600 font-bold mt-4 text-lg">
              <span>View Properties</span>
              <FiHome className="ml-2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
