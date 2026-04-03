import React from 'react';
import { Users } from 'lucide-react';

const Community = () => {
  return (
    <div className="view-content animate-in">
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <Users size={48} style={{ margin: '0 auto 20px', color: 'var(--text-muted)' }} />
        <h1 style={{ marginBottom: '16px' }}>Спільнота (В розробці)</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
          Цей розділ наразі знаходиться в розробці. Незабаром тут з'явиться можливість спілкуватися з іншими студентами.
        </p>
      </div>
    </div>
  );
};

export default Community;
