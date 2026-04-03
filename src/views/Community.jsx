import React from 'react';
import { Users, MessageSquare, Calendar, Heart } from 'lucide-react';

const Community = ({ user }) => {
  return (
    <div className="community-view animate-in">
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
        <Users size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Спільнота</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
          Цей розділ знаходиться в розробці. Незабаром тут з'являться дискусії, групи та події.
        </p>
      </div>
    </div>
  );
};

export default Community;
