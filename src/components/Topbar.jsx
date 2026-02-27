import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Topbar = () => {
    return (
        <header className="topbar">
            <div className="search-container glass-panel">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Пошук курсів, викладачів або силабусів..."
                    className="search-input"
                />
            </div>

            <div className="topbar-actions">
                <button className="action-btn glass-panel notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>

                <div className="profile-container glass-panel">
                    <div className="profile-info">
                        <span className="profile-name">Студент</span>
                        <span className="profile-major">Бакалавр Інженерії ПЗ</span>
                    </div>
                    <div className="profile-avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
