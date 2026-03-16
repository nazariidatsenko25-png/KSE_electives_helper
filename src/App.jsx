import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Dashboard, AiAdvisor, CourseEvaluations, CourseCatalog, Profile } from './views';
import { mockUser } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);

  const handleMockLogin = () => {
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} setCurrentView={setCurrentView} />;
      case 'ai-advisor':
        return <AiAdvisor user={user} />;
      case 'evaluations':
        return <CourseEvaluations user={user} />;
      case 'catalog':
        return <CourseCatalog user={user} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Topbar user={user} onLogin={handleMockLogin} onLogout={handleLogout} currentView={currentView} setCurrentView={setCurrentView} />
        <main className="view-container">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
