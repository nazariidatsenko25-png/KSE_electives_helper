import { Target, Award, BookOpen, Clock, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = ({ user, setCurrentView }) => {
    const { t } = useApp();
    const d = t.dashboard;
    
    // Dynamic Degree Progress based on real user data or mock default
    const totalCredits = 120;
    const earnedCredits = user?.total_credits || 0;

    // Mock schedule data (would also come from API in a full implementation)
    const scheduleDays = [d.days.mon, d.days.tue, d.days.wed, d.days.thu, d.days.fri];
    const timeSlots = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];
    const scheduleItems = [
        { id: 1, title: d.courses.ds, day: d.days.mon, time: '10:30', type: 'core', duration: 1.5 },
        { id: 2, title: d.courses.micro, day: d.days.tue, time: '09:00', type: 'core', duration: 1.5 },
        { id: 3, title: d.courses.be, day: d.days.wed, time: '13:30', type: 'elective', duration: 1.5 },
        { id: 4, title: d.courses.ds, day: d.days.thu, time: '10:30', type: 'core', duration: 1.5 },
    ];

    return (
        <div className="dashboard-view animate-in">
            <div className="dashboard-header">
                <h1 className="heading-1">{d.welcome}, {user?.first_name || user?.email?.split('@')[0] || d.student}</h1>
                <p className="text-muted">{d.progressSubtitle}</p>
            </div>

            <div className="dashboard-grid">
                {/* Degree Progress Widget */}
                <section className="glass-panel widget-progress">
                    <div className="widget-header">
                        <h2 className="heading-2">{d.auditTitle}</h2>
                        <Target className="text-muted" size={24} />
                    </div>

                    <div className="progress-content-flex">
                        <div className="donut-container">
                            <svg viewBox="0 0 100 100" className="donut-chart">
                                <circle className="donut-bg" cx="50" cy="50" r="40" />
                                <circle
                                    className="donut-fill"
                                    cx="50" cy="50" r="40"
                                    strokeDasharray={`${(earnedCredits / totalCredits) * 251.2} 251.2`}
                                />
                            </svg>
                            <div className="donut-text">
                                <span className="donut-value">{earnedCredits} / {totalCredits}</span>
                                <span className="donut-label">ECTS</span>
                            </div>
                        </div>

                        <div className="progress-stats">
                            <div className="stat-card">
                                <span className="stat-value">{user ? '3.8' : 'N/A'}</span>
                                <span className="stat-label">{d.gpa}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value text-success">{d.active}</span>
                                <span className="stat-label">{d.semesterStatus}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Cards */}
                <div className="action-cards">
                    <div className="glass-panel action-card highlight">
                        <div className="action-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                            <MessageSquare size={24} color="var(--color-secondary)" />
                        </div>
                        <div className="action-content">
                            <h3>{d.evalOpenTitle}</h3>
                            <p>{d.evalOpenDesc}</p>
                            <button className="btn-primary mt-sm" onClick={() => setCurrentView('evaluations')}>{d.startEval}</button>
                        </div>
                    </div>

                    <div className="glass-panel action-card">
                        <div className="action-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                            <Sparkles size={24} color="var(--color-accent)" />
                        </div>
                        <div className="action-content">
                            <h3>{d.planTitle}</h3>
                            <p>{d.planDesc}</p>
                            <button className="btn-secondary mt-sm" onClick={() => setCurrentView('ai-advisor')}>{d.openSmartCourse}</button>
                        </div>
                    </div>
                </div>

                {/* Schedule Builder Widget */}
                <section className="glass-panel widget-schedule">
                    <div className="widget-header">
                        <h2 className="heading-2">{d.scheduleTitle}</h2>
                        <Clock className="text-muted" size={24} />
                    </div>

                    <div className="schedule-grid">
                        <div className="schedule-header-row">
                            <div className="time-col-header"></div>
                            {scheduleDays.map(day => (
                                <div key={day} className="day-header">{day}</div>
                            ))}
                        </div>

                        <div className="schedule-body">
                            {timeSlots.map((time) => (
                                <div key={time} className="schedule-row">
                                    <div className="time-label">{time}</div>
                                    {scheduleDays.map(day => {
                                        const matchedItem = scheduleItems.find(item => item.day === day && item.time === time);
                                        return (
                                            <div key={`${day}-${time}`} className="schedule-cell">
                                                {matchedItem && (
                                                    <div className={`schedule-item ${matchedItem.type}`}>
                                                        <span className="item-title">{matchedItem.title}</span>
                                                        <span className="item-time">{matchedItem.time}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
