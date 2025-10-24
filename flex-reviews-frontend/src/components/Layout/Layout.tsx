import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Spacer between sidebar and main content */}
        <div className="w-6 bg-transparent md:w-8 lg:w-10"></div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page content */}
          <MainContent />
        </div>
      </div>
    </Router>
  );
};

export default Layout;