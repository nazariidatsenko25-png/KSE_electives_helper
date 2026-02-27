import React, { useState, useEffect } from 'react';
import { Send, Bot, Sparkles, BookOpen, Clock, Activity, Key } from 'lucide-react';
import Groq from 'groq-sdk';

const AiAdvisor = () => {
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: 'Привіт, Студенте! Я бачу, що ти навчаєшся на Інженерії Програмного Забезпечення. Шукаєш вибіркові курси для напрямку ШІ/Дані чи щось ширше на наступний семестр?',
            recs: null
        }
    ]);

    useEffect(() => {
        localStorage.setItem('groq_api_key', apiKey);
    }, [apiKey]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        if (!apiKey) {
            alert("Будь ласка, спочатку введіть ваш Groq API Key (для Meta Llama 3) у вікні контексту.");
            return;
        }

        const userQuery = query;
        setMessages(prev => [...prev, { type: 'human', text: userQuery, recs: null }]);
        setQuery('');
        setIsLoading(true);

        try {
            const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

            const systemInstruction = `You are SmartCourse AI, an academic advisor for Kyiv School of Economics. 
The student is Alex (Студент), a 3rd year Software Engineering major. 
Moodle shows he completed Data Structures and Calculus. 
He needs 1 Humanities elective. 
Reply with friendly advice and exactly 2 specific course recommendations that best match his query.
CRITICAL EXPLICIT INSTRUCTION: YOU MUST REPLY AND TRANSLATE EVERYTHING EXCLUSIVELY TO UKRAINIAN (УКРАЇНСЬКА МОВА). 
You MUST return ONLY a valid JSON object matching this schema, but all the string values MUST be in Ukrainian:
{
  "message": "Ваша текстова відповідь студенту українською",
  "recommendations": [
    {
      "id": 1,
      "code": "Код курсу (напр. CS401)",
      "title": "Назва курсу українською",
      "matchScore": 95,
      "workload": "напр. 12 год/тиж",
      "gradeDist": "напр. B+ Медіана",
      "reasoning": "Чому цей курс підходить (українською)"
    }
  ]
}`;

            // Build conversation history for the model (optional, but good for context)
            const history = messages.map(m => `${m.type === 'ai' ? 'Радник' : 'Студент'}: ${m.text}`).join('\n');
            const prompt = `Conversation History:\n${history}\n\nStudent's new query: ${userQuery}`;

            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: prompt }
                ],
                model: "llama-3.1-8b-instant",
                response_format: { type: "json_object" }
            });

            const dataString = chatCompletion.choices[0]?.message?.content || "{}";
            const data = JSON.parse(dataString);

            setMessages(prev => [...prev, {
                type: 'ai',
                text: data.message || "Ось декілька рекомендацій.",
                recs: data.recommendations && data.recommendations.length > 0 ? data.recommendations : null
            }]);

        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                type: 'ai',
                text: "Вибачте, виникла помилка під час підключення до Meta Llama 3 через Groq: " + err.message,
                recs: null
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="advisor-view animate-in">
            <div className="advisor-header">
                <div className="header-title">
                    <Sparkles className="text-gradient" size={28} />
                    <h1 className="heading-1 m-0">SmartCourse AI</h1>
                </div>
                <p className="text-muted">Працює на базі Meta Llama 3 (через Groq Fast API)</p>
            </div>

            <div className="chat-layout">
                <div className="chat-window glass-panel">
                    <div className="message-list">
                        {messages.map((msg, i) => (
                            <React.Fragment key={i}>
                                <div className={`message-bubble ${msg.type}`}>
                                    <div className="message-avatar">
                                        {msg.type === 'ai' ? <Bot size={18} /> : 'A'}
                                    </div>
                                    <div className="message-content">{msg.text}</div>
                                </div>

                                {msg.recs && (
                                    <div className="recommendations-container animate-in">
                                        {msg.recs.map((rec, idx) => (
                                            <div key={idx} className="rec-card glass-panel">
                                                <div className="rec-header">
                                                    <div>
                                                        <span className="rec-code">{rec.code}</span>
                                                        <h3 className="rec-title">{rec.title}</h3>
                                                    </div>
                                                    <div className="match-badge">{rec.matchScore}% Збіг</div>
                                                </div>

                                                <p className="rec-reasoning">{rec.reasoning}</p>

                                                <div className="rec-metrics">
                                                    <div className="metric">
                                                        <Clock size={14} className="text-muted" />
                                                        <span>{rec.workload}</span>
                                                    </div>
                                                    <div className="metric">
                                                        <Activity size={14} className="text-muted" />
                                                        <span>{rec.gradeDist}</span>
                                                    </div>
                                                    <button type="button" className="btn-secondary btn-sm ml-auto">Силабус</button>
                                                    <button type="button" className="btn-primary btn-sm">Додати алгоритм</button>
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
                                <div className="message-content">Думаю...</div>
                            </div>
                        )}
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
                    <div className="context-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Key size={14} className="text-accent" />
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Groq API Key (Llama 3)</span>
                        </div>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={e => setApiKey(e.target.value)}
                            placeholder="Вставте Groq Key сюди"
                            style={{
                                width: '100%',
                                padding: '6px 8px',
                                borderRadius: '4px',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-main)',
                                fontSize: '0.8rem'
                            }}
                        />
                    </div>
                    <div className="context-item">
                        <span className="indicator active"></span>
                        <span>Транскрипти Moodle синхронізовано</span>
                    </div>
                    <div className="context-item">
                        <span className="indicator active"></span>
                        <span>Програма: Бакалавр ІПЗ (3 курс)</span>
                    </div>
                    <div className="context-item">
                        <span className="indicator warning"></span>
                        <span>Відсутній 1 гуманітарний вибірковий</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiAdvisor;
