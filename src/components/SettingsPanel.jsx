import React from 'react';
import { X, Moon, Sun, Type, Languages, Eye, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SettingsPanel = () => {
    const { 
        theme, setTheme, 
        fontSize, setFontSize, 
        language, setLanguage, 
        dyslexiaMode, setDyslexiaMode,
        settingsOpen, setSettingsOpen,
        t 
    } = useApp();

    if (!settingsOpen) return null;

    const s = t.settings;

    return (
        <div className="settings-overlay animate-in" onClick={() => setSettingsOpen(false)}>
            <div className="settings-panel glass-panel" onClick={e => e.stopPropagation()}>
                <div className="settings-header">
                    <div className="settings-title">
                        <Type size={18} />
                        <h3>{s.title}</h3>
                    </div>
                    <button className="settings-close" onClick={() => setSettingsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="settings-content">
                    {/* Theme */}
                    <div className="settings-group">
                        <label className="settings-label">
                            <Moon size={14} /> {s.theme}
                        </label>
                        <div className="theme-toggle-group">
                            <button 
                                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon size={14} /> {s.dark}
                            </button>
                            <button 
                                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun size={14} /> {s.light}
                            </button>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="settings-group">
                        <label className="settings-label">
                            <Languages size={14} /> {s.language}
                        </label>
                        <div className="lang-switcher">
                            {['uk', 'en', 'de'].map(lang => (
                                <button 
                                    key={lang}
                                    className={`lang-btn ${language === lang ? 'active' : ''}`}
                                    onClick={() => setLanguage(lang)}
                                >
                                    {lang.toUpperCase()}
                                    {language === lang && <Check size={12} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font Size */}
                    <div className="settings-group">
                        <label className="settings-label">
                            <Type size={14} /> {s.fontSize}
                        </label>
                        <div className="font-size-group">
                            {['small', 'medium', 'large'].map(sz => (
                                <button 
                                    key={sz}
                                    className={`font-btn ${fontSize === sz ? 'active' : ''}`}
                                    onClick={() => setFontSize(sz)}
                                >
                                    {s.fontSizes[sz]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dyslexia Mode */}
                    <div className="settings-group">
                        <div className="dyslexia-toggle-wrap">
                            <label className="settings-label" style={{ marginBottom: 0 }}>
                                <Eye size={14} /> {s.dyslexia}
                            </label>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={dyslexiaMode} 
                                    onChange={e => setDyslexiaMode(e.target.checked)} 
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="settings-footer">
                    <span className="version-tag">{s.version}</span>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
