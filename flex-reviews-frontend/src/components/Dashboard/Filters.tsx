import React from 'react';

interface FiltersProps {
  filters: { 
    rating: string; 
    category: string; 
    channel: string; 
    date: string;
    search: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleClearFilters = () => {
    setFilters({
      rating: '',
      category: '',
      channel: '',
      date: '',
      search: '',
      sortBy: 'submittedAt',
      sortOrder: 'desc'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="font-semibold text-lg mb-4">Filter & Sort Reviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search reviews..."
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
          <select 
            value={filters.rating} 
            onChange={e => setFilters({ ...filters, rating: e.target.value })} 
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="9">9+ Stars</option>
            <option value="8">8+ Stars</option>
            <option value="7">7+ Stars</option>
            <option value="6">6+ Stars</option>
            <option value="5">5+ Stars</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            value={filters.category} 
            onChange={e => setFilters({ ...filters, category: e.target.value })} 
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="communication">Communication</option>
            <option value="respect_house_rules">Respect for House Rules</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
          <select 
            value={filters.channel} 
            onChange={e => setFilters({ ...filters, channel: e.target.value })} 
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Channels</option>
            <option value="hostaway">Hostaway</option>
            <option value="google">Google</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select 
            value={filters.date} 
            onChange={e => setFilters({ ...filters, date: e.target.value })} 
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Dates</option>
            <option value="recent">Recent (Last 30 days)</option>
            <option value="past-month">Past Month (30-90 days)</option>
            <option value="older">Older (90+ days)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select 
            value={filters.sortBy} 
            onChange={e => setFilters({ ...filters, sortBy: e.target.value })} 
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="submittedAt">Date</option>
            <option value="overallRating">Rating</option>
            <option value="listingName">Property</option>
            <option value="guestName">Guest</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <select 
            value={filters.sortOrder} 
            onChange={e => setFilters({ ...filters, sortOrder: e.target.value as 'asc' | 'desc' })} 
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <button 
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;