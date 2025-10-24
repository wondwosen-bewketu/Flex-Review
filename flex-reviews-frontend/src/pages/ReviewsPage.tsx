import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { NormalizedReview } from "../types";
import Filters from "../components/Dashboard/Filters";
import ReviewsTable from "../components/Dashboard/ReviewsTable";
import {
  FiSave,
  FiAlertCircle,
  FiTrendingUp,
  FiDatabase,
  FiLoader,
  FiRefreshCw,
} from "react-icons/fi";
import { API_BASE } from "../config/api.config";

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReviews, setSelectedReviews] = useState<Set<number>>(
    new Set()
  );
  const [filters, setFilters] = useState({
    rating: "",
    category: "",
    channel: "",
    date: "",
    search: "",
    sortBy: "submittedAt",
    sortOrder: "desc" as "desc" | "asc",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchReviews();
    const saved = localStorage.getItem("selectedReviews");
    if (saved) setSelectedReviews(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedReviews",
      JSON.stringify(Array.from(selectedReviews))
    );
  }, [selectedReviews]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/reviews/all`);
      setReviews(data.reviews);
      setError(null);
    } catch {
      setError("Failed to load reviews. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const saveSelectedReviews = async () => {
    if (selectedReviews.size === 0) return;
    setSaving(true);
    try {
      const reviewsByListing: Record<string, number[]> = {};
      selectedReviews.forEach((id) => {
        const review = reviews.find((r) => r.id === id);
        if (review) {
          if (!reviewsByListing[review.listingName])
            reviewsByListing[review.listingName] = [];
          reviewsByListing[review.listingName].push(id);
        }
      });

      await Promise.all(
        Object.entries(reviewsByListing).map(([listingName, ids]) =>
          axios.post(`${API_BASE}/reviews/selected`, {
            listingName,
            selectedReviewIds: ids,
          })
        )
      );

      alert(`Successfully saved ${selectedReviews.size} selected reviews!`);
    } catch (err) {
      console.error(err);
      alert("Failed to save selected reviews. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          (r.listingName && r.listingName.toLowerCase().includes(term)) ||
          (r.guestName && r.guestName.toLowerCase().includes(term)) ||
          (r.publicReview && r.publicReview.toLowerCase().includes(term))
      );
    }
    if (filters.rating)
      result = result.filter(
        (r) => (r.overallRating || 0) >= Number(filters.rating)
      );
    if (filters.category)
      result = result.filter((r) =>
        r.categories.some((c) => c.category.includes(filters.category))
      );
    if (filters.channel)
      result = result.filter((r) => r.channel.includes(filters.channel));
    if (filters.date)
      result = result.filter((r) => r.dateBucket === filters.date);

    result.sort((a, b) => {
      const aVal = a[filters.sortBy as keyof NormalizedReview];
      const bVal = b[filters.sortBy as keyof NormalizedReview];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return filters.sortOrder === "asc" ? -1 : 1;
      if (bVal == null) return filters.sortOrder === "asc" ? 1 : -1;

      const aComp: string | number =
        filters.sortBy === "overallRating"
          ? (aVal as number) || 0
          : String(aVal).toLowerCase();
      const bComp: string | number =
        filters.sortBy === "overallRating"
          ? (bVal as number) || 0
          : String(bVal).toLowerCase();

      if (filters.sortOrder === "asc")
        return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
      return aComp < bComp ? 1 : aComp > bComp ? -1 : 0;
    });

    return result;
  }, [reviews, filters]);

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedReviews);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReviews(newSelected);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-indigo-700">
            Loading Reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="modern-dashboard-header">
        <div className="modern-dashboard-header-content">
          <div>
            <h1 className="modern-dashboard-title flex items-center gap-3">
              <FiDatabase className="text-indigo-600" />
              Reviews Management
            </h1>
            <p className="modern-dashboard-subtitle">
              Select and manage your property reviews
            </p>
          </div>
          <div className="modern-dashboard-stats">
            <div className="modern-dashboard-stat-badge">
              <FiDatabase className="text-indigo-600" />
              <span>{filteredAndSortedReviews.length} Reviews</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveSelectedReviews}
            disabled={saving || selectedReviews.size === 0}
            className={`px-6 py-3 flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 ${
              saving || selectedReviews.size === 0
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            <FiSave />
            {saving ? "Saving..." : `${selectedReviews.size} Selected Reviews`}
          </button>
        </div>

        {/* Filters & Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 overflow-hidden">
          <div className="p-6 border-b border-white/30 bg-gradient-to-r from-slate-50 to-white/50">
            <Filters filters={filters} setFilters={setFilters} />
          </div>

          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center m-6">
              <FiAlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {error}
              </h3>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={fetchReviews}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FiRefreshCw />
                  Retry
                </button>
              </div>
            </div>
          ) : filteredAndSortedReviews.length > 0 ? (
            <div className="p-6">
              <ReviewsTable
                reviews={filteredAndSortedReviews}
                toggleSelect={toggleSelect}
                selected={selectedReviews}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-16 text-center m-6 border border-slate-200">
              <FiTrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                No Reviews Match Your Filters
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Try adjusting your filters to find the reviews you're looking
                for.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    search: "",
                    rating: "",
                    category: "",
                    channel: "",
                    date: "",
                  })
                }
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReviewsPage;
