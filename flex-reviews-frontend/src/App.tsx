import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PropertyPage from './pages/PropertyPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Flex Reviews Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/property/:listingName" element={<PropertyPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;