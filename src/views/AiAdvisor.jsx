import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, BookOpen, Clock, Activity, Lock, X, FileText } from 'lucide-react';
import { fetchWithAuth } from '../utils/api';
import { mockTranscript } from '../data/mockData';

// Mock syllabus data for recommended courses
const mockSyllabi = {
    default: {
        title: 'Силабус курсу',
        objectives: [
            'Розуміти фундаментальні концепції дисципліни',
            'Вміти застосовувати теоретичні знання на практиці',
            'Розвивати критичне мислення та навички аналізу',
        ],
        schedule: [
            { week: '1-2', topic: 'Вступ та основні концепції' },
            { week: '3-4', topic: 'Теоретичні основи' },
            { week: '5-6', topic: 'Практичні методи' },
            { week: '7-8', topic: 'Проміжне оцінювання та проєкт' },
            { week: '9-10', topic: 'Поглиблене вивчення' },
            { week: '11-12', topic: 'Семінари та кейси' },
            { week: '13-14', topic: 'Фінальний проєкт та іспит' },
        ],
        grading: [
            { component: 'Домашні завдання', weight: '30%' },
            { component: 'Проміжний іспит', weight: '20%' },
            { component: 'Груповий проєкт', weight: '20%' },
            { component: 'Фінальний іспит', weight: '30%' },
        ],
        textbook: 'Підручник та додаткові матеріали будуть надані викладачем на платформі Moodle.',
    },
};

const AiAdvisor = ({ user }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [syllabusModal, setSyllabusModal] = useState(null);
    const messageEndRef = useRef(null);

    const transcript = mockTranscript;

    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: `Привіт, ${user ? user.first_name || user.email.split('@')[0] : 'Студенте'}! Я бачу, що ти навчаєшся на спеціальності "${user ? user.major : 'Інженерії Програмного Забезпечення'}". Чим можу допомогти з плануванням предметів?`,
            recs: null
        }
    ]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userQuery = query;
        setMessages(prev => [...prev, { type: 'human', text: userQuery, recs: null, tools: null }]);
        setQuery('');
        setIsLoading(true);

        try {
            // Send conversation history + new query to backend
            // The backend handles the LLM call securely (API key stays server-side)
            const data = await fetchWithAuth('/api/ai/chat/', {
                method: 'POST',
                suppressAuthRedirect: true,
                body: JSON.stringify({
                    messages: messages.slice(1).filter(m => m.text), // Skip initial greeting, send real conversation
                    query: userQuery,
                }),
            });

            // Build tool action labels for display
            const toolLabels = {
                get_transcript: '📋 Перевірено транскрипт',
                check_prerequisites: '🔍 Перевірено передумови',
                add_to_wishlist: '⭐ Додано до списку бажань',
            };

            const toolActions = (data.tools_used || []).map(t => toolLabels[t.tool] || t.tool);

            setMessages(prev => [...prev, {
                type: 'ai',
                text: data.message || "Ось декілька рекомендацій.",
                recs: data.recommendations && data.recommendations.length > 0 ? data.recommendations : null,
                tools: toolActions.length > 0 ? toolActions : null,
                compacted: data.compacted || false,
            }]);

        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                type: 'ai',
                text: "Вибачте, виникла помилка: " + err.message,
                recs: null,
                tools: null,
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const openSyllabus = (code, title) => {
        setSyllabusModal({ code, title });
    };

    if (!user) {
        return (
            <div className="advisor-view animate-in centered">
                <div className="glass-panel text-center" style={{ marginTop: '10%', padding: '3rem' }}>
                    <Lock size={48} className="text-muted mb-md" />
                    <h2 className="heading-2">Авторизація обов'язкова</h2>
                    <p className="text-muted">Щоб ШІ-советник міг давати персоналізовані поради, увійдіть у систему.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="advisor-view animate-in">
            <div className="advisor-header">
                <div className="header-title">
                    <Sparkles className="text-gradient" size={28} />
                    <h1 className="heading-1 m-0">SmartCourse AI</h1>
                </div>
                <p className="text-muted">Працює на базі Meta Llama 3 (через Backend API)</p>
            </div>

            <div className="chat-layout">
                <div className="chat-window glass-panel">
                    <div className="message-list">
                        {messages.map((msg, i) => (
                            <React.Fragment key={i}>
                                <div className={`message-bubble ${msg.type}`}>
                                    <div className="message-avatar">
                                        {msg.type === 'ai' ? <Bot size={18} /> : (user.first_name?.[0] || 'С')}
                                    </div>
                                    <div className="message-content">{msg.text}</div>
                                </div>

                                {/* Tool-use action badges (cookbook pattern) */}
                                {msg.tools && (
                                    <div className="tool-actions animate-in" style={{
                                        display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
                                        margin: '0.25rem 0 0.5rem 2.5rem',
                                    }}>
                                        {msg.tools.map((tool, ti) => (
                                            <span key={ti} style={{
                                                fontSize: '0.7rem', padding: '2px 8px',
                                                borderRadius: '12px', background: 'rgba(99,102,241,0.15)',
                                                color: 'var(--color-primary)', fontWeight: 500,
                                            }}>{tool}</span>
                                        ))}
                                    </div>
                                )}

                                {/* Session compaction notice */}
                                {msg.compacted && (
                                    <div style={{
                                        fontSize: '0.65rem', color: 'var(--text-muted)',
                                        margin: '0 0 0.5rem 2.5rem', opacity: 0.7,
                                    }}>
                                        🔄 Контекст розмови було стиснуто для оптимізації
                                    </div>
                                )}

                                {msg.recs && (
                                    <div className="recommendations-container animate-in">
                                        {msg.recs.map((rec, idx) => (
                                            <div key={idx} className="rec-card glass-panel">
                                                <div className="rec-header">
                                                    <div>
                                                        <span className="rec-code">{rec.code}</span>
                                                        <h3 className="rec-title">{rec.title}</h3>
                                                    </div>
                                                    <div className="match-badge">{rec.credits} ECTS</div>
                                                </div>

                                                <div className="rec-metrics">
                                                    <div className="metric">
                                                        <Clock size={14} className="text-muted" />
                                                        <span>{rec.trimester}</span>
                                                    </div>
                                                    <div className="metric">
                                                        <Activity size={14} className="text-muted" />
                                                        <span>{rec.instructor}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn-secondary btn-sm ml-auto"
                                                        onClick={() => openSyllabus(rec.code, rec.title)}
                                                    >
                                                        Силабус
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}

                        {isLoading && (
                            <div className="message-bubble ai animate-in">
                                <div className="message-avatar">
                                    <Bot size={18} />
                                </div>
                                <div className="message-content">
                                    <span className="typing-dots">Думаю<span>.</span><span>.</span><span>.</span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messageEndRef} />
                    </div>

                    <form className="chat-input-area border-t" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Напр., я хочу вибірковий курс про дані, але щоб було не надто багато математики..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="send-btn btn-primary" disabled={isLoading}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>

                <div className="context-panel glass-panel">
                    <h3 className="heading-2 text-sm uppercase">Контекст ШІ</h3>
                    <div className="context-item">
                        <span className="indicator active"></span>
                        <span>Транскрипти: {transcript.length} курсів</span>
                    </div>
                    <div className="context-item">
                        <span className="indicator active"></span>
                        <span>{user.major} ({user.current_year} курс)</span>
                    </div>
                    <div className="context-item">
                        <span className="indicator active"></span>
                        <span>ECTS: {user.total_credits} / 120</span>
                    </div>
                    <div className="context-item">
                        <span className="indicator warning"></span>
                        <span>Відсутній 1 гуманітарний вибірковий</span>
                    </div>
                    <div className="context-item" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                        🟢 Backend API Mode
                    </div>
                </div>
            </div>

            {/* Syllabus Modal */}
            {syllabusModal && (
                <div className="syllabus-overlay" onClick={() => setSyllabusModal(null)}>
                    <div className="syllabus-modal glass-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="syllabus-modal-header">
                            <div>
                                <span className="rec-code">{syllabusModal.code}</span>
                                <h2 className="heading-2" style={{ marginTop: '4px' }}>{syllabusModal.title}</h2>
                            </div>
                            <button className="notif-close-btn" onClick={() => setSyllabusModal(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="syllabus-body">
                            <div className="syllabus-section">
                                <h3><FileText size={16} /> Цілі курсу</h3>
                                <ul>
                                    {mockSyllabi.default.objectives.map((obj, i) => (
                                        <li key={i}>{obj}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="syllabus-section">
                                <h3><Clock size={16} /> Тижневий план</h3>
                                <div className="syllabus-schedule">
                                    {mockSyllabi.default.schedule.map((item, i) => (
                                        <div key={i} className="syllabus-week">
                                            <span className="week-num">Тижні {item.week}</span>
                                            <span className="week-topic">{item.topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="syllabus-section">
                                <h3><Activity size={16} /> Оцінювання</h3>
                                <div className="syllabus-grading">
                                    {mockSyllabi.default.grading.map((item, i) => (
                                        <div key={i} className="grading-row">
                                            <span>{item.component}</span>
                                            <span className="grading-weight">{item.weight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="syllabus-section">
                                <h3><BookOpen size={16} /> Підручник</h3>
                                <p className="text-muted">{mockSyllabi.default.textbook}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiAdvisor;
