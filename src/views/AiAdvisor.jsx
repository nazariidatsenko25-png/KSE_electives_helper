import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, BookOpen, Clock, Activity, Lock, X, FileText, GraduationCap, AlertTriangle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
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

// Lightweight markdown renderer for AI responses
const renderMarkdown = (text) => {
    if (!text) return '';
    let html = text
        // Escape HTML entities first
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        // Bold: **text** or __text__
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.+?)__/g, '<strong>$1</strong>')
        // Italic: *text* (not bullet) — only when surrounded by word chars
        .replace(/(?<!\n)\*(?!\s)(.+?)(?<!\s)\*/g, '<em>$1</em>');

    // Process line by line for lists and paragraphs
    const lines = html.split('\n');
    const result = [];
    let inList = false;
    let listType = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const bulletMatch = line.match(/^[*-]\s+(.+)/);
        const numberedMatch = line.match(/^\d+\.\s+(.+)/);

        if (bulletMatch) {
            if (!inList || listType !== 'ul') {
                if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
                result.push('<ul>');
                inList = true; listType = 'ul';
            }
            result.push(`<li>${bulletMatch[1]}</li>`);
        } else if (numberedMatch) {
            if (!inList || listType !== 'ol') {
                if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
                result.push('<ol>');
                inList = true; listType = 'ol';
            }
            result.push(`<li>${numberedMatch[1]}</li>`);
        } else {
            if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
            if (line.trim() === '') {
                result.push('<br/>');
            } else {
                result.push(`<span>${line}</span><br/>`);
            }
        }
    }
    if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
    return result.join('');
};

const AiAdvisor = ({ user, setCurrentView }) => {
    const { t } = useApp();
    const a = t.aiAdvisor;
    
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [syllabusModal, setSyllabusModal] = useState(null);
    const messageEndRef = useRef(null);

    const transcript = mockTranscript;

    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: `${a.greeting}, ${user ? (user.first_name || user.email.split('@')[0]) : t.dashboard.student}${a.greetingSuffix}`,
            recs: null
        }
    ]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const suggestedPrompts = [
        a.suggested.ds,
        a.suggested.prereq,
        a.suggested.schedule,
        a.suggested.elective,
    ];

    const handleSend = async (e, customQuery = null) => {
        if (e) e.preventDefault();
        
        const q = customQuery || query;
        if (!q.trim()) return;

        const userQuery = q;
        setMessages(prev => [...prev, { type: 'human', text: userQuery, recs: null, tools: null }]);
        if (!customQuery) setQuery('');
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
                get_transcript: a.tools.transcript,
                check_prerequisites: a.tools.prereqs,
                add_to_wishlist: a.tools.wishlist,
            };

            const toolActions = (data.tools_used || []).map(t => toolLabels[t.tool] || t.tool);

            setMessages(prev => [...prev, {
                type: 'ai',
                text: data.message || "---",
                recs: data.recommendations && data.recommendations.length > 0 ? data.recommendations : null,
                tools: toolActions.length > 0 ? toolActions : null,
                compacted: data.compacted || false,
            }]);

        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                type: 'ai',
                text: a.error + " " + err.message,
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
                    <h2 className="heading-2">{a.authRequired}</h2>
                    <p className="text-muted">{a.authDesc}</p>
                    <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => setCurrentView('profile')}>
                        {t.sidebar.profile}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="advisor-view animate-in">
            <div className="advisor-header">
                <div className="header-title">
                    <Sparkles className="text-gradient" size={28} />
                    <h1 className="heading-1 m-0">{a.title}</h1>
                </div>
                <p className="text-muted">{a.subtitle}</p>
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
                                    <div className="message-content">
                                        {msg.type === 'ai' ? (
                                            <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                                        ) : (
                                            msg.text
                                        )}
                                        {msg.type === 'ai' && i === 0 && messages.length === 1 && (
                                            <div className="prompt-chips animate-in">
                                                {suggestedPrompts.map((prompt, pIdx) => (
                                                    <button 
                                                        key={pIdx} 
                                                        className="prompt-chip"
                                                        onClick={() => handleSend(null, prompt)}
                                                    >
                                                        {prompt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tool-use action badges (cookbook pattern) */}
                                {msg.tools && (
                                    <div className="tool-actions animate-in" style={{
                                        display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
                                        margin: '0.25rem 0 0.5rem 2.5rem',
                                    }}>
                                        {msg.tools.map((tool, ti) => (
                                            <span key={ti} style={{
                                                fontSize: '0.75rem', padding: '4px 12px',
                                                borderRadius: '16px', background: 'rgba(99,102,241,0.15)',
                                                color: '#c7d2fe', fontWeight: 600,
                                                border: '1px solid rgba(99,102,241,0.3)',
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                            }}>
                                                <CheckCircle size={12} color="#818cf8" /> {tool}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Session compaction notice */}
                                {msg.compacted && (
                                    <div style={{
                                        fontSize: '0.65rem', color: 'var(--text-muted)',
                                        margin: '0 0 0.5rem 2.5rem', opacity: 0.7,
                                    }}>
                                        {a.compacted}
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
                                    <span className="typing-dots">{a.thinking}</span>
                                </div>
                            </div>
                        )}
                        <div ref={messageEndRef} />
                    </div>

                    <form className="chat-input-area border-t" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder={a.placeholder}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="send-btn-premium btn-primary group" disabled={isLoading}>
                            <span style={{ paddingRight: '0.25rem', fontSize: '0.9rem' }}>Надіслати</span>
                            <div className="btn-inner-icon-wrapper">
                                {isLoading ? (
                                    <div 
                                        className="loader spin-icon" 
                                        style={{ width: '16px', height: '16px', borderWidth: '2px' }} 
                                        role="status" 
                                        aria-label="Завантаження відповіді..."
                                    />
                                ) : (
                                    <Send size={16} aria-hidden="true" />
                                )}
                            </div>
                        </button>
                    </form>
                </div>

                <div className="context-panel glass-panel">
                    <h3 className="heading-2 text-sm uppercase">{a.contextTitle}</h3>
                    <div className="context-item">
                        <BookOpen size={16} className="text-info" />
                        <span>{a.transcriptContext}: {transcript.length} {t.sidebar.evaluations.toLowerCase()}</span>
                    </div>
                    <div className="context-item">
                        <GraduationCap size={16} className="text-success" />
                        <span>{user.major} ({user.current_year} курс)</span>
                    </div>
                    <div className="context-item">
                        <Activity size={16} className="text-primary-dark" />
                        <span>{a.ectsContext}: {user.total_credits} / 120</span>
                    </div>
                    <div className="context-item alert">
                        <AlertTriangle size={16} className="text-warning" style={{ color: '#F59E0B' }} />
                        <span>{a.missingElective}</span>
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
                                <h3><FileText size={16} /> {a.syllabus.objectives}</h3>
                                <ul>
                                    {mockSyllabi.default.objectives.map((obj, i) => (
                                        <li key={i}>{obj}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="syllabus-section">
                                <h3><Clock size={16} /> {a.syllabus.plan}</h3>
                                <div className="syllabus-schedule">
                                    {mockSyllabi.default.schedule.map((item, i) => (
                                        <div key={i} className="syllabus-week">
                                            <span className="week-num">{a.syllabus.weeks} {item.week}</span>
                                            <span className="week-topic">{item.topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="syllabus-section">
                                <h3><Activity size={16} /> {a.syllabus.grading}</h3>
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
                                <h3><BookOpen size={16} /> {a.syllabus.textbook}</h3>
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
