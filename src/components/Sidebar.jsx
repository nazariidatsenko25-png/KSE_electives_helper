import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BookOpen,
  Users,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = ({ currentView, setCurrentView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { t } = useApp();

  const menuItems = [
    { id: 'dashboard',   label: t.sidebar.dashboard,    icon: LayoutDashboard },
    { id: 'ai-advisor',  label: t.sidebar.aiAdvisor, icon: Sparkles },
    { id: 'evaluations', label: t.sidebar.evaluations, icon: MessageSquare },
  ];

  const secondaryItems = [
    { id: 'catalog',    label: t.sidebar.catalog, icon: BookOpen,  enabled: true },
    { id: 'community',  label: t.sidebar.community,       icon: Users,    enabled: true },
    { id: 'schedule',   label: t.sidebar.schedule,     icon: Calendar, enabled: false },
  ];

  const handleNav = (id) => {
    setCurrentView(id);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-box">S</div>
            <span className="logo-text">StudentO</span>
          </div>
        </div>

        <div className="sidebar-scroll">
          <div className="menu-group">
            <span className="menu-label">{t.sidebar.mainMenu}</span>
            <nav className="menu-nav">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`menu-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {isActive && <div className="active-indicator" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="menu-group">
            <span className="menu-label">{t.sidebar.learning}</span>
            <nav className="menu-nav">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id && item.enabled;
                return (
                  <button
                    key={item.id}
                    onClick={item.enabled ? () => handleNav(item.id) : undefined}
                    className={`menu-item ${isActive ? 'active' : ''} ${!item.enabled ? 'disabled' : ''}`}
                    title={!item.enabled ? t.sidebar.comingSoon : ''}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {isActive && <div className="active-indicator" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
