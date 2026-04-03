import React, { useRef, useEffect } from 'react';
import { Settings, X, Sun, Moon, Type, Globe, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FONT_OPTIONS = ['small', 'medium', 'large'];

export default function SettingsPanel() {
  const { 
    theme, setTheme, 
    fontSize, setFontSize, 
    language, setLanguage,
    dyslexiaMode, setDyslexiaMode,
    settingsOpen, setSettingsOpen,
    t
  } = useApp();
  
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [settingsOpen, setSettingsOpen]);

  const handleFontSlider = (e) => {
    setFontSize(FONT_OPTIONS[e.target.value]);
  };

  return (
    <div className="settings-fab-container" ref={panelRef}>
      {settingsOpen && (
        <div className="settings-panel glass-panel animate-in">
          <div className="settings-panel-header">
            <span className="settings-panel-title">
              <Settings size={15} />
              {t.settings.title}
            </span>
            <button className="settings-close-btn" onClick={() => setSettingsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="settings-section">
            <span className="settings-section-label">
              <Sun size={13} />
              {t.settings.theme}
            </span>
            <div className="settings-toggle-row">
              <button
                className={`settings-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <Moon size={15} />
                {t.settings.dark}
              </button>
              <button
                className={`settings-theme-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <Sun size={15} />
                {t.settings.light}
              </button>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="settings-section">
            <span className="settings-section-label">
              <Globe size={13} />
              {t.settings.language}
            </span>
            <div className="settings-toggle-row">
              <button
                className={`settings-theme-btn ${language === 'uk' ? 'active' : ''}`}
                onClick={() => setLanguage('uk')}
              >
                Укр
              </button>
              <button
                className={`settings-theme-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                Eng
              </button>
              <button
                className={`settings-theme-btn ${language === 'de' ? 'active' : ''}`}
                onClick={() => setLanguage('de')}
              >
                Deu
              </button>
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="settings-section">
            <span className="settings-section-label">
              <Type size={13} />
              {t.settings.fontSize}
            </span>
            <div className="font-slider-wrapper">
              <span style={{fontSize: '0.8rem', fontWeight: 600}}>A</span>
              <input 
                type="range" 
                min="0" max="2" step="1" 
                value={FONT_OPTIONS.indexOf(fontSize)} 
                onChange={handleFontSlider}
                className="font-size-slider"
              />
              <span style={{fontSize: '1.2rem', fontWeight: 600}}>A</span>
            </div>
          </div>

          {/* Dyslexia Mode */}
          <div className="settings-section">
            <div className="dyslexia-toggle-wrapper">
              <span className="settings-section-label" style={{marginBottom: 0}}>
                <Eye size={13} />
                {t.settings.dyslexia}
              </span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={dyslexiaMode} 
                  onChange={(e) => setDyslexiaMode(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-panel-footer">
            <span>{t.settings.version}</span>
          </div>
        </div>
      )}

      <button
        className={`settings-fab ${settingsOpen ? 'open' : ''}`}
        onClick={() => setSettingsOpen(o => !o)}
        title="Налаштування"
      >
        <Settings size={20} />
      </button>
    </div>
  );
}
