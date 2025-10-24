import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import PropertyPage from '../../pages/PropertyPage';
import StatsPage from '../../pages/StatsPage';
import ReviewsPage from '../../pages/ReviewsPage';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="enhanced-fade-in">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/property/:listingName" element={<PropertyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;