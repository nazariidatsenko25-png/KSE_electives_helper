/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../locales';

const AppContext = createContext(null);

const FONT_SCALE = {
  small:  { '--base-font-size': '14px' },
  medium: { '--base-font-size': '16px' },
  large:  { '--base-font-size': '19px' },
};

const DARK_THEME = {
  '--bg': '#0b1120',
  '--surface': '#111827',
  '--surface-hover': '#1f2937',
  '--text-main': '#FFFFFF',
  '--text-muted': '#9CA3AF',
  '--border': 'rgba(255, 255, 255, 0.05)',
  '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
  '--input-bg': 'rgba(255,255,255,0.05)',
  '--color-primary': '#6B21A8',
};

const LIGHT_THEME = {
  '--bg': '#F1F5F9', 
  '--surface': '#FFFFFF',
  '--surface-hover': '#E2E8F0',
  '--text-main': '#0F172A',
  '--text-muted': '#475569',
  '--border': 'rgba(0, 0, 0, 0.12)', 
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '--input-bg': '#F8FAFC',
  '--color-primary': '#6D28D9', 
  '--color-success': '#059669', 
  '--color-info': '#2563EB',
};

function applyTheme(theme, fontSize, dyslexiaMode) {
  const vars = theme === 'light' ? LIGHT_THEME : DARK_THEME;
  const fontVars = FONT_SCALE[fontSize] || FONT_SCALE.medium;
  const root = document.documentElement;
  Object.entries({ ...vars, ...fontVars }).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute('data-theme', theme);
  root.classList.toggle('dyslexia-mode', dyslexiaMode);
  document.body.classList.toggle('dyslexia-mode', dyslexiaMode);
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'dark');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('app_font_size') || 'medium');
  const [language, setLanguage] = useState(() => localStorage.getItem('app_language') || 'uk');
  const [dyslexiaMode, setDyslexiaMode] = useState(() => localStorage.getItem('app_dyslexia') === 'true');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('user_profile_ext');
      return saved ? JSON.parse(saved) : {
        avatarType: 'color',      
        avatarColor: '#6B21A8',
        avatarEmoji: '',
        avatarImage: null,         
        bio: '',
        linkedIn: '',
        isPrivate: false,
        lastSeen: new Date().toISOString(),
      };
    } catch { 
      return { 
        avatarType: 'color', 
        avatarColor: '#6B21A8', 
        avatarEmoji: '', 
        avatarImage: null, 
        bio: '', 
        linkedIn: '', 
        isPrivate: false, 
        lastSeen: new Date().toISOString() 
      }; 
    }
  });

  const [wallPosts, setWallPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('profile_wall');
      return saved ? JSON.parse(saved) : [
        { id: 1, author: 'Максим Петренко', authorColor: '#2563EB', text: 'Привіт! Дуже цікавий профіль 👍', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
        { id: 2, author: 'Анна Сидоренко',  authorColor: '#059669', text: 'Рада познайомитись! Ми разом на CS302 🚀', timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
        { id: 3, author: 'Дмитро Коваль',   authorColor: '#D97706', text: 'Дякую за допомогу з лабораторною!', timestamp: new Date(Date.now() - 3600000 * 48).toISOString() },
      ];
    } catch { return []; }
  });

  useEffect(() => {
    applyTheme(theme, fontSize, dyslexiaMode);
    localStorage.setItem('app_theme', theme);
    localStorage.setItem('app_font_size', fontSize);
    localStorage.setItem('app_language', language);
    localStorage.setItem('app_dyslexia', dyslexiaMode);
  }, [theme, fontSize, language, dyslexiaMode]);

  const updateUserProfile = useCallback((updates) => {
    setUserProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('user_profile_ext', JSON.stringify(next));
      return next;
    });
  }, []);

  const addWallPost = useCallback((text, authorName, authorColor = '#6B21A8') => {
    setWallPosts(prev => {
      const next = [
        { id: Date.now(), author: authorName, authorColor, text, timestamp: new Date().toISOString() },
        ...prev,
      ];
      localStorage.setItem('profile_wall', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteWallPost = useCallback((id) => {
    setWallPosts(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('profile_wall', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      theme, setTheme,
      fontSize, setFontSize,
      language, setLanguage,
      dyslexiaMode, setDyslexiaMode,
      settingsOpen, setSettingsOpen,
      userProfile, updateUserProfile,
      wallPosts, addWallPost, deleteWallPost,
      t: translations[language] || translations.uk,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export default AppContext;
