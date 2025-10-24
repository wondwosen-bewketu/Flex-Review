import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { NormalizedReview } from "../types";
import {
  FiBarChart,
  FiActivity,
  FiAlertCircle,
  FiRefreshCw,
  FiUsers,
  FiHome,
  FiStar,
  FiClock,
  FiDatabase,
} from "react-icons/fi";
import { API_BASE } from "../config/api.config";

const StatsPage: React.FC = () => {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Calculate detailed statistics
  const stats = useMemo(() => {
    const total = reviews.length;
    const avg =
      total > 0
        ? reviews.reduce((sum, r) => sum + (r.overallRating || 0), 0) / total
        : 0;
    const positives = reviews.filter((r) => (r.overallRating || 0) >= 8).length;
    const issues = reviews.filter((r) => (r.overallRating || 0) < 6).length;
    const properties = new Set(reviews.map((r) => r.listingName)).size;
    const channels = new Set(reviews.map((r) => r.channel)).size;

    // Calculate rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      if (review.overallRating !== null) {
        const index = Math.max(
          0,
          Math.min(9, Math.floor(review.overallRating))
        );
        ratingDistribution[index]++;
      }
    });

    // Top performing properties
    const propertyStats = reviews.reduce((acc, review) => {
      if (!acc[review.listingName]) {
        acc[review.listingName] = { total: 0, sum: 0, count: 0 };
      }
      acc[review.listingName].total++;
      acc[review.listingName].sum += review.overallRating || 0;
      acc[review.listingName].count++;
      return acc;
    }, {} as Record<string, { total: number; sum: number; count: number }>);

    const topProperties = Object.entries(propertyStats)
      .map(([name, stats]) => ({
        name,
        avgRating: stats.sum / stats.count,
        reviewCount: stats.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 5);

    return {
      total,
      avg: avg.toFixed(1),
      positives: Math.round((positives / total) * 100) || 0,
      issues: Math.round((issues / total) * 100) || 0,
      properties,
      channels,
      ratingDistribution,
      topProperties,
    };
  }, [reviews]);

  // Modern Stat Card Component
  const StatCard = ({
    title,
    value,
    icon,
    gradient,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    gradient: string;
    subtitle?: string;
  }) => (
    <div
      className={`modern-stat-card cursor-pointer transform hover:-translate-y-2 transition-all duration-300 ${gradient}`}
    >
      <div className="modern-stat-card-icon bg-white/20 shadow-lg">{icon}</div>
      <div className="modern-stat-card-value">{value}</div>
      <div className="modern-stat-card-title tracking-wider">{title}</div>
      {subtitle && (
        <div className="text-slate-700 text-xs mt-1 font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping absolute opacity-20"></div>
            <FiBarChart className="h-24 w-24 text-indigo-600 mx-auto relative z-10" />
          </div>
          <p className="text-3xl font-bold text-indigo-800 mt-8">
            Analyzing Data
          </p>
          <p className="text-indigo-600 mt-3 text-lg">
            Preparing your insights...
          </p>
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
                <FiBarChart className="text-indigo-600 text-2xl" />
              </div>
              Analytics Dashboard
            </h1>
            <p className="modern-dashboard-subtitle text-lg">
              Comprehensive insights into your property reviews performance
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 shadow-xl text-center">
            <FiAlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-red-800 mb-4">{error}</h3>
            <button
              onClick={fetchReviews}
              className="flex items-center mx-auto px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-lg font-bold"
            >
              <FiRefreshCw className="mr-3" /> Retry
            </button>
          </div>
        )}

        {/* Key Metrics - Responsive grid for larger screens, horizontal scroll for smaller */}
        <div>
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              title="Total Reviews"
              value={stats.total}
              icon={<FiBarChart />}
              gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
            />
            <StatCard
              title="High Performers"
              value={`${stats.positives}%`}
              icon={<FiActivity />}
              gradient="bg-gradient-to-br from-green-500 to-emerald-600"
              subtitle="8+ Rating"
            />
            <StatCard
              title="Avg Rating"
              value={stats.avg}
              icon={<FiStar />}
              gradient="bg-gradient-to-br from-amber-500 to-orange-500"
              subtitle="/10 Scale"
            />
            <StatCard
              title="Needs Attention"
              value={`${stats.issues}%`}
              icon={<FiAlertCircle />}
              gradient="bg-gradient-to-br from-rose-500 to-red-600"
              subtitle="<6 Rating"
            />
            <StatCard
              title="Properties"
              value={stats.properties}
              icon={<FiHome />}
              gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
            />
          </div>

          {/* Horizontal scroll for smaller screens */}
          <div className="md:hidden flex overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex space-x-6 min-w-max">
              <StatCard
                title="Total Reviews"
                value={stats.total}
                icon={<FiBarChart />}
                gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
              />
              <StatCard
                title="High Performers"
                value={`${stats.positives}%`}
                icon={<FiActivity />}
                gradient="bg-gradient-to-br from-green-500 to-emerald-600"
                subtitle="8+ Rating"
              />
              <StatCard
                title="Avg Rating"
                value={stats.avg}
                icon={<FiStar />}
                gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                subtitle="/10 Scale"
              />
              <StatCard
                title="Needs Attention"
                value={`${stats.issues}%`}
                icon={<FiAlertCircle />}
                gradient="bg-gradient-to-br from-rose-500 to-red-600"
                subtitle="<6 Rating"
              />
              <StatCard
                title="Properties"
                value={stats.properties}
                icon={<FiHome />}
                gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Performance Overview */}
          <div className="enhanced-action-card lg:col-span-2">
            <h2 className="enhanced-action-card-title">Performance Overview</h2>
            <p className="enhanced-action-card-description">
              Distribution of reviews across different rating levels
            </p>

            <div className="mt-8 space-y-5">
              {stats.ratingDistribution.map((count, index) => {
                const percentage =
                  stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={index} className="flex items-center">
                    <div className="w-14 text-sm font-bold text-slate-700">
                      {index}★
                    </div>
                    <div className="flex-1 mx-5">
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            index >= 8
                              ? "bg-green-500"
                              : index >= 6
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 text-sm font-bold text-slate-800 text-right">
                      {count} ({percentage.toFixed(1)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performing Properties */}
          <div className="enhanced-action-card">
            <h2 className="enhanced-action-card-title">Top Properties</h2>
            <p className="enhanced-action-card-description">
              Highest rated properties in your portfolio
            </p>

            <div className="mt-8 space-y-5">
              {stats.topProperties.map((property, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-slate-800">
                        {property.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {property.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-amber-50 px-3 py-2 rounded-lg">
                    <FiStar className="text-amber-500 mr-2" />
                    <span className="font-bold text-slate-800 text-lg">
                      {property.avgRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="enhanced-action-card">
          <h2 className="enhanced-action-card-title">Actionable Insights</h2>
          <p className="enhanced-action-card-description">
            Data-driven recommendations to improve your property performance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <FiActivity className="text-xl" />
                </div>
                <h3 className="font-bold text-green-800 ml-4 text-xl">
                  Strengths
                </h3>
              </div>
              <p className="text-green-700 text-lg">
                {stats.positives}% of your reviews are high performers (8+
                rating). Continue maintaining excellent guest experiences.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <FiClock className="text-xl" />
                </div>
                <h3 className="font-bold text-amber-800 ml-4 text-xl">
                  Opportunities
                </h3>
              </div>
              <p className="text-amber-700 text-lg">
                {stats.issues}% of reviews need attention. Focus on properties
                with ratings below 6 to improve overall satisfaction.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FiUsers className="text-xl" />
                </div>
                <h3 className="font-bold text-indigo-800 ml-4 text-xl">
                  Growth
                </h3>
              </div>
              <p className="text-indigo-700 text-lg">
                You manage {stats.properties} properties across {stats.channels}{" "}
                channels. Consider expanding your portfolio in high-performing
                markets.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;
