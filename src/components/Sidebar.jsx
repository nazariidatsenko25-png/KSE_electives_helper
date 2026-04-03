import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BookOpen,
  Calendar,
  Users,
  Settings,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = ({ currentView, setCurrentView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { setSettingsOpen } = useApp();

  const menuItems = [
    { id: 'dashboard',   label: 'Головна',    icon: LayoutDashboard },
    { id: 'ai-advisor',  label: 'ШІ-Асистент', icon: Sparkles },
    { id: 'evaluations', label: 'Оцінювання', icon: MessageSquare },
  ];

  const secondaryItems = [
    { id: 'catalog',    label: 'Каталог курсів', icon: BookOpen,  enabled: true },
    { id: 'community',  label: 'Спільнота',       icon: Users,    enabled: true },
    { id: 'schedule',   label: 'Мій розклад',     icon: Calendar, enabled: false },
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
            <span className="menu-label">Головне Меню</span>
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
            <span className="menu-label">Навчання</span>
            <nav className="menu-nav">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id && item.enabled;
                return (
                  <button
                    key={item.id}
                    onClick={item.enabled ? () => handleNav(item.id) : undefined}
                    className={`menu-item ${isActive ? 'active' : ''} ${!item.enabled ? 'disabled' : ''}`}
                    title={!item.enabled ? 'Незабаром' : ''}
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

        <div className="sidebar-footer">
          <button
            className={`menu-item ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
          >
            <User size={20} />
            <span>Профіль</span>
            {currentView === 'profile' && <div className="active-indicator" />}
          </button>
          <button className="menu-item" onClick={() => setSettingsOpen(true)}>
            <Settings size={20} />
            <span>Налаштування</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
