import React from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

interface FiltersProps {
  filters: {
    rating: string;
    category: string;
    channel: string;
    date: string;
    search: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps["filters"]>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleClearFilters = () => {
    setFilters({
      rating: "",
      category: "",
      channel: "",
      date: "",
      search: "",
      sortBy: "submittedAt",
      sortOrder: "desc",
    });
  };

  // Check if any filter is active
  const hasActiveFilters =
    filters.rating !== "" ||
    filters.category !== "" ||
    filters.channel !== "" ||
    filters.date !== "" ||
    filters.search !== "";

  return (
    <div className="modern-filters-bar">
      {/* Search Filter */}
      <div className="modern-filter-group">
        <label className="modern-filter-label">Search Reviews</label>
        <div className="modern-filter-input-container">
          <FiSearch className="modern-filter-input-icon" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search..."
            className="modern-filter-input"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="modern-filter-group">
        <label className="modern-filter-label">Minimum Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          className="modern-filter-select"
        >
          <option value="">Any Rating</option>
          <option value="9">9+ Stars</option>
          <option value="8">8+ Stars</option>
          <option value="7">7+ Stars</option>
          <option value="6">6+ Stars</option>
          <option value="5">5+ Stars</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="modern-filter-group">
        <label className="modern-filter-label">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="modern-filter-select"
        >
          <option value="">All Categories</option>
          <option value="cleanliness">Cleanliness</option>
          <option value="communication">Communication</option>
          <option value="respect_house_rules">House Rules</option>
        </select>
      </div>

      {/* Channel Filter */}
      <div className="modern-filter-group">
        <label className="modern-filter-label">Channel</label>
        <select
          value={filters.channel}
          onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
          className="modern-filter-select"
        >
          <option value="">All Channels</option>
          <option value="hostaway">Hostaway</option>
          <option value="google">Google</option>
          <option value="airbnb">Airbnb</option>
          <option value="booking">Booking.com</option>
        </select>
      </div>

      {/* Date Filter */}
      <div className="modern-filter-group">
        <label className="modern-filter-label">Time Period</label>
        <select
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="modern-filter-select"
        >
          <option value="">All Time</option>
          <option value="recent">Recent 30 Days</option>
          <option value="past-month">Past Month</option>
          <option value="past-quarter">Past Quarter</option>
          <option value="older">Older</option>
        </select>
      </div>

      {/* Clear Button */}
      <div className="flex items-end">
        <button
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className={`modern-filter-clear-btn ${
            !hasActiveFilters ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {hasActiveFilters ? (
            <>
              <FiX className="w-4 h-4" />
              Clear Filters
            </>
          ) : (
            <>
              <FiFilter className="w-4 h-4" />
              No Active Filters
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Filters;
