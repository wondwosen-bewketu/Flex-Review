import React, { useState } from "react";
import {
  FiHome,
  FiBarChart2,
  FiTrendingUp,
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiList,
  FiSettings,
  FiUsers,
  FiStar,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/",
    },
    {
      id: "stats",
      label: "Analytics",
      icon: <FiBarChart2 size={20} />,
      path: "/stats",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <FiList size={20} />,
      children: [
        {
          id: "all-reviews",
          label: "All Reviews",
          icon: <FiList size={16} />,
          path: "/reviews",
        },
        {
          id: "featured",
          label: "Featured Reviews",
          icon: <FiStar size={16} />,
          path: "/reviews/featured",
        },
      ],
    },
    {
      id: "properties",
      label: "Properties",
      icon: <FiTrendingUp size={20} />,
      children: [
        {
          id: "all-properties",
          label: "All Properties",
          icon: <FiTrendingUp size={16} />,
          path: "/properties",
        },
        {
          id: "property-reports",
          label: "Performance Reports",
          icon: <FiFileText size={16} />,
          path: "/properties/reports",
        },
      ],
    },
    {
      id: "tenants",
      label: "Tenants",
      icon: <FiUsers size={20} />,
      path: "/tenants",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FiSettings size={20} />,
      path: "/settings",
    },
  ];

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    // Special handling for table view
    if (path === "/reviews") {
      return location.pathname === "/reviews";
    }
    // For dashboard, match exact path
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/stats") {
      return location.pathname === "/stats";
    }
    // For other paths, check if current path starts with this path
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.id] || false;
    const active = isActive(item.path);

    return (
      <div key={item.id} className="mb-1">
        {hasChildren ? (
          <>
            <button
              className={`w-full flex items-center justify-between modern-sidebar-menu-item ${
                active ? "active" : ""
              }`}
              onClick={() => toggleMenu(item.id)}
            >
              <div className="flex items-center">
                <span
                  className={`modern-sidebar-icon ${
                    active ? "text-white" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </div>
              <span className={active ? "text-white" : ""}>
                {isOpen ? (
                  <FiChevronDown size={16} />
                ) : (
                  <FiChevronRight size={16} />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="modern-sidebar-submenu">
                {item.children?.map((child) => (
                  <button
                    key={child.id}
                    className={`w-full flex items-center modern-sidebar-submenu-item ${
                      isActive(child.path) ? "active" : ""
                    }`}
                    onClick={() => handleNavigation(child.path)}
                  >
                    <span
                      className={`modern-sidebar-icon ${
                        isActive(child.path) ? "text-indigo-600" : ""
                      }`}
                    >
                      {child.icon}
                    </span>
                    <span className="text-sm">{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <button
            className={`w-full flex items-center modern-sidebar-menu-item ${
              active ? "active" : ""
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            <span
              className={`modern-sidebar-icon ${
                active ? "text-white" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="modern-sidebar h-full flex flex-col">
      {/* Logo */}
      <div className="modern-sidebar-logo">
        <div className="modern-sidebar-logo-icon">R</div>
        <h2 className="text-xl font-bold text-slate-900">ReviewHub</h2>
      </div>

      {/* Menu */}
      <div className="modern-sidebar-menu">
        {menuItems.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default Sidebar;