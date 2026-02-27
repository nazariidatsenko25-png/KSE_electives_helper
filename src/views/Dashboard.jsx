import React, { useState } from 'react';
import { Target, Award, BookOpen, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    // Mock data for Degree Progress
    const degreeProgress = {
        totalCredits: 120,
        earnedCredits: 85,
        majorRequired: 60,
        majorEarned: 45,
        freeElectives: 60,
        freeEarned: 40,
        gpa: 3.8
    };

    // Mock schedule data
    const scheduleDays = ['Пн', 'Вв', 'Ср', 'Чт', 'Пт'];
    const timeSlots = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];
    const scheduleItems = [
        { id: 1, title: 'Структури даних', day: 'Пн', time: '10:30', type: 'core', duration: 1.5 },
        { id: 2, title: 'Мікроекономіка', day: 'Вв', time: '09:00', type: 'core', duration: 1.5 },
        { id: 3, title: 'Поведінкова екон.', day: 'Ср', time: '13:30', type: 'elective', duration: 1.5 },
        { id: 4, title: 'Структури даних', day: 'Чт', time: '10:30', type: 'core', duration: 1.5 },
    ];

    return (
        <div className="dashboard-view animate-in">
            <div className="dashboard-header">
                <h1 className="heading-1">З поверненням, Студент</h1>
                <p className="text-muted">Ось твій академічний прогрес за осінній триместр 2026</p>
            </div>

            <div className="dashboard-grid">
                {/* Degree Progress Widget */}
                <section className="glass-panel widget-progress">
                    <div className="widget-header">
                        <h2 className="heading-2">Аудит прогресу навчання</h2>
                        <Target className="text-muted" size={24} />
                    </div>

                    <div className="progress-content-flex">
                        <div className="donut-container">
                            <svg viewBox="0 0 100 100" className="donut-chart">
                                <circle className="donut-bg" cx="50" cy="50" r="40" />
                                <circle
                                    className="donut-fill"
                                    cx="50" cy="50" r="40"
                                    strokeDasharray={`${(degreeProgress.earnedCredits / degreeProgress.totalCredits) * 251.2} 251.2`}
                                />
                            </svg>
                            <div className="donut-text">
                                <span className="donut-value">{degreeProgress.earnedCredits} / {degreeProgress.totalCredits}</span>
                                <span className="donut-label">ECTS</span>
                            </div>
                        </div>

                        <div className="progress-stats">
                            <div className="stat-card">
                                <span className="stat-value">{degreeProgress.gpa}</span>
                                <span className="stat-label">Середній бал (GPA)</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value text-success">Активний</span>
                                <span className="stat-label">Статус семестру</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Cards */}
                <div className="action-cards">
                    <div className="glass-panel action-card highlight">
                        <div className="action-icon">
                            <AlertCircle size={24} color="var(--color-accent)" />
                        </div>
                        <div className="action-content">
                            <h3>Оцінювання курсів відкрито</h3>
                            <p>Залиште свій відгук за минулий семестр, щоб отримати ранній доступ до оцінок.</p>
                            <button className="btn-primary mt-sm">Почати оцінювання</button>
                        </div>
                    </div>

                    <div className="glass-panel action-card">
                        <div className="action-icon">
                            <BookOpen size={24} className="text-gradient" />
                        </div>
                        <div className="action-content">
                            <h3>Спланувати наступний семестр</h3>
                            <p>Реєстрація відкривається за 14 днів. Складіть свій розклад з ШІ.</p>
                            <button className="btn-secondary mt-sm">Відкрити SmartCourse</button>
                        </div>
                    </div>
                </div>

                {/* Schedule Builder Widget */}
                <section className="glass-panel widget-schedule">
                    <div className="widget-header">
                        <h2 className="heading-2">Інтерактивний розклад</h2>
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
                            {timeSlots.map((time, index) => (
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
