import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Dashboard, AiAdvisor, CourseEvaluations } from './views';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-advisor':
        return <AiAdvisor />;
      case 'evaluations':
        return <CourseEvaluations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Topbar />
        <main className="view-container">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
