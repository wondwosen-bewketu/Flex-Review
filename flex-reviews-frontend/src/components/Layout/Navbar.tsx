import { useState } from "react";
import { FiBell, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Left side - Menu button for mobile */}
      <div className="flex items-center">
        <button
          className="md:hidden mr-3 text-slate-600 hover:text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <div className="flex items-center">
          <h1 className="ml-3 text-xl font-bold text-slate-900 hidden sm:block">
            Flex Living Reviews
          </h1>
        </div>
      </div>

      {/* Center - Search (hidden on mobile) */}
      <div className="hidden md:block flex-1 max-w-md mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties, guests..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FiBell
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            size={16}
          />
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
