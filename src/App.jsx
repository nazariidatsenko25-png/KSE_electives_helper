import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Dashboard, AiAdvisor, CourseEvaluations, CourseCatalog, Profile, StudentProfile, InstructorProfile } from './views';
import { mockUser } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewParams, setViewParams] = useState({});
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMockLogin = () => {
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const navigate = (view, params = {}) => {
    setViewParams(params);
    setCurrentView(view);
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
        return <CourseCatalog user={user} navigate={navigate} />;
      case 'profile':
        return <Profile user={user} />;
      case 'student-profile':
        return <StudentProfile userId={viewParams.userId} onBack={() => navigate('catalog')} />;
      case 'instructor-profile':
        return <InstructorProfile courseId={viewParams.courseId} onBack={() => navigate('catalog')} />;
      default:
        return <Dashboard user={user} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="main-content">
        <Topbar 
          user={user} 
          onLogin={handleMockLogin} 
          onLogout={handleLogout} 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="view-container">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
