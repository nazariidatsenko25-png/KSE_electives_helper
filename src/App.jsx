import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Dashboard, AiAdvisor, CourseEvaluations, CourseCatalog, Profile, StudentProfile, InstructorProfile } from './views';
import { mockUser } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') || 'dashboard';
  });
  const [viewParams, setViewParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const vp = {};
    for (let [k, v] of params.entries()) {
      if (k !== 'view') vp[k] = v;
    }
    return vp;
  });
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handlePopState = (e) => {
      const params = new URLSearchParams(window.location.search);
      setCurrentView(params.get('view') || 'dashboard');
      const vp = {};
      for (let [k, v] of params.entries()) {
        if (k !== 'view') vp[k] = v;
      }
      setViewParams(vp);

      const savedScroll = e.state?.scrollTop;
      if (savedScroll !== undefined) {
        setTimeout(() => {
          const container = document.querySelector('.view-container');
          if (container) container.scrollTo({ top: savedScroll, behavior: 'instant' });
        }, 50);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams();
    params.set('view', currentView);
    Object.entries(viewParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.set(k, v);
    });
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    
    // Only push if the URL actually needs to change to avoid loops
    if (window.location.search !== `?${params.toString()}`) {
      const container = document.querySelector('.view-container');
      const currentScroll = container ? container.scrollTop : 0;
      window.history.replaceState({ ...window.history.state, scrollTop: currentScroll }, '');
      window.history.pushState({ scrollTop: 0 }, '', newUrl);
      if (container) container.scrollTo(0, 0);
    }
  }, [currentView, viewParams]);

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
