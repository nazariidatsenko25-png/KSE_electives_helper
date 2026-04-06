import React, { createContext, useContext, useState, useCallback } from 'react';

import { translations } from '../locales.js';

// ─── Default User Profile ────────────────────────────────────────────────────
const defaultUserProfile = {
  avatarType: 'color',
  avatarColor: '#6B21A8',
  avatarEmoji: null,
  avatarImage: null,
  bio: '',
  linkedIn: '',
  isPrivate: false,
  lastSeen: new Date().toISOString(),
};

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('uk');
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('kse_user_profile');
      return saved ? { ...defaultUserProfile, ...JSON.parse(saved) } : defaultUserProfile;
    } catch {
      return defaultUserProfile;
    }
  });

  const [wallPosts, setWallPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('kse_wall_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const t = translations[language] || translations.uk;

  const updateUserProfile = useCallback((updates) => {
    setUserProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('kse_user_profile', JSON.stringify(next));
      return next;
    });
  }, []);

  const addWallPost = useCallback((text, authorName, authorColor) => {
    setWallPosts(prev => {
      const next = [
        { id: Date.now(), text, author: authorName, authorColor, timestamp: new Date().toISOString() },
        ...prev,
      ];
      localStorage.setItem('kse_wall_posts', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteWallPost = useCallback((postId) => {
    setWallPosts(prev => {
      const next = prev.filter(p => p.id !== postId);
      localStorage.setItem('kse_wall_posts', JSON.stringify(next));
      return next;
    });
  }, []);

  const value = {
    t,
    language,
    setLanguage,
    userProfile,
    updateUserProfile,
    wallPosts,
    addWallPost,
    deleteWallPost,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}

export default AppContext;
