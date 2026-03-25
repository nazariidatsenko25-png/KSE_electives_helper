import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BookOpen,
  Calendar,
  Users,
  Settings
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Головна', icon: LayoutDashboard },
    { id: 'ai-advisor', label: 'ШІ-Асистент', icon: Sparkles },
    { id: 'evaluations', label: 'Оцінювання', icon: MessageSquare },
  ];

  const secondaryItems = [
    { id: 'catalog', label: 'Каталог курсів', icon: BookOpen },
    { id: 'schedule', label: 'Мій розклад', icon: Calendar },
    { id: 'community', label: 'Спільнота', icon: Users },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
          <div className="logo-box">K</div>
          <span className="logo-text">KSE Hub</span>
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
                  onClick={() => {
                    setCurrentView(item.id);
                    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                  }}
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
              const isEnabled = item.id === 'catalog';
              const isActive = currentView === item.id && isEnabled;
              return (
                <button
                  key={item.id}
                  onClick={isEnabled ? () => {
                    setCurrentView(item.id);
                    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                  } : undefined}
                  className={`menu-item ${isActive ? 'active' : ''} ${!isEnabled ? 'disabled' : ''}`}
                  title={!isEnabled ? 'Незабаром' : ''}
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
        <button className="menu-item">
          <Settings size={20} />
          <span>Налаштування</span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
