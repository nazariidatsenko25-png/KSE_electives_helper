import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, MessageSquare, Calendar, Award, X } from 'lucide-react';

const Topbar = ({ user, onLogin, onLogout, setCurrentView }) => {
    const [showNotifs, setShowNotifs] = useState(false);
    const notifRef = useRef(null);

    const notifications = [
        {
            id: 1,
            icon: MessageSquare,
            iconColor: '#10B981',
            title: 'Оцінювання курсів відкрито',
            desc: 'Залиште відгук за минулий семестр до 15 березня.',
            time: '2 год тому',
            unread: true,
        },
        {
            id: 2,
            icon: Calendar,
            iconColor: '#3B82F6',
            title: 'Реєстрація на весняний семестр',
            desc: 'Реєстрація на курси відкриється 12 березня.',
            time: '1 день тому',
            unread: true,
        },
        {
            id: 3,
            icon: Award,
            iconColor: '#F59E0B',
            title: 'Оцінки опубліковані',
            desc: 'Результати з "Мікроекономіка" вже доступні.',
            time: '3 дні тому',
            unread: true,
        },
    ];

    // Close on click outside
    useEffect(() => {
        const handleClick = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotifs(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

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
                <div className="notif-wrapper" ref={notifRef}>
                    <button
                        className="action-btn glass-panel notification-btn"
                        onClick={() => setShowNotifs(!showNotifs)}
                    >
                        <Bell size={20} />
                        <span className="notification-badge">{notifications.filter(n => n.unread).length}</span>
                    </button>

                    {showNotifs && (
                        <div className="notif-dropdown glass-panel">
                            <div className="notif-dropdown-header">
                                <h3>Сповіщення</h3>
                                <button className="notif-close-btn" onClick={() => setShowNotifs(false)}>
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="notif-list">
                                {notifications.map((n) => {
                                    const Icon = n.icon;
                                    return (
                                        <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                                            <div className="notif-icon" style={{ background: `${n.iconColor}20`, color: n.iconColor }}>
                                                <Icon size={16} />
                                            </div>
                                            <div className="notif-content">
                                                <span className="notif-title">{n.title}</span>
                                                <span className="notif-desc">{n.desc}</span>
                                                <span className="notif-time">{n.time}</span>
                                            </div>
                                            {n.unread && <div className="notif-dot" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {user ? (
                    <div className="profile-container glass-panel" onClick={() => setCurrentView('profile')}>
                        <div className="profile-info">
                            <span className="profile-name">{user.first_name || user.email.split('@')[0]}</span>
                            <span className="profile-major">{user.major || 'Студент'}</span>
                        </div>
                        <div className="profile-avatar">
                            <User size={20} />
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); onLogout(); }} style={{ marginLeft: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Вийти</button>
                    </div>
                ) : (
                    <button onClick={onLogin} className="btn-primary" style={{ cursor: 'pointer' }}>Увійти через Google</button>
                )}
            </div>
        </header>
    );
};

export default Topbar;
