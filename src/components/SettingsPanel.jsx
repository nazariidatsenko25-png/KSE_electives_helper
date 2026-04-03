import React from 'react';
import { X, Moon, Sun, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SettingsPanel = () => {
  const { settingsOpen, setSettingsOpen } = useApp();

  if (!settingsOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setSettingsOpen(false)}>
      <div className="glass-panel" style={{ width: '400px', maxWidth: '90vw', padding: '24px', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Налаштування</h2>
          <button className="icon-btn" onClick={() => setSettingsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Moon size={18} />
              <span>Темна тема</span>
            </div>
            <button className="toggle-switch on"><div className="toggle-thumb" /></button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Bell size={18} />
              <span>Сповіщення</span>
            </div>
            <button className="toggle-switch/"><div className="toggle-thumb" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
