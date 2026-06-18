import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Info, Send, Users, Calendar, Clock,
  ChevronRight, Swords, CircleDot, Volleyball, Trophy,
  Mic2, Activity, Hash, ArrowLeft, Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';


// ─── Club definitions ─────────────────────────────────────────────────────────
// ─── Club definitions (Helper to get translated data) ─────────────────────────
const getClubs = (t) => [
  {
    id: 'mma',
    name: t.community.clubs_data.mma.name,
    emoji: '\u{1F94A}',
    color: '#EF4444',
    members: 42,
    description: t.community.clubs_data.mma.desc,
    schedule: [
      { day: t.dashboard.days.mon, time: '18:00\u201320:00', type: 'Technique' },
      { day: t.dashboard.days.wed, time: '18:00\u201320:00', type: 'Sparring' },
      { day: t.dashboard.days.fri, time: '17:00\u201319:00', type: 'Crossfit' },
    ],
    announcements: [
      { text: 'Open tournament April 20 — registration open!', date: '1 Apr' },
      { text: 'New coach — Andrii Romanov joined the team.', date: '28 Mar' },
    ],
    initMessages: [
      { id: 1, author: 'Andrii R.',  color: '#EF4444', text: 'Hey guys! Tomorrow training is moved to 19:00 🥊', time: '10:30', mine: false },
      { id: 2, author: 'Oleg K.',    color: '#F59E0B', text: 'Okay, thanks for the heads up!', time: '10:30', mine: false },
      { id: 1, author: 'Ви',         color: '#6B21A8', text: 'Will be there!', time: '10:45', mine: true },
    ],
  },
  {
    id: 'chess',
    name: t.community.clubs_data.chess.name,
    emoji: '♟️',
    color: '#8B5CF6',
    members: 28,
    description: t.community.clubs_data.chess.desc,
    schedule: [
      { day: t.dashboard.days.tue, time: '17:00\u201319:00', type: 'Open practice' },
      { day: t.dashboard.days.thu, time: '17:30\u201319:30', type: 'Blitz tournament' },
    ],
    announcements: [
      { text: 'University chess championship — April 15.', date: '2 Apr' },
      { text: "Online cup registration closes on Friday.", date: '30 Mar' },
    ],
    initMessages: [
      { id: 1, author: 'Dmytro V.',  color: '#8B5CF6', text: 'Who is going to the tournament on Thursday?', time: '14:00', mine: false },
    ],
  },
  {
    id: 'volleyball',
    name: t.community.clubs_data.volleyball.name,
    emoji: '🏐',
    color: '#F59E0B',
    members: 35,
    description: t.community.clubs_data.volleyball.desc,
    schedule: [
      { day: t.dashboard.days.mon, time: '19:00\u201321:00', type: 'Practice (Gym A)' },
      { day: t.dashboard.days.sat, time: '10:00\u201312:00', type: 'Game practice' },
    ],
    announcements: [
      { text: 'Match vs NaUKMA — April 18, Gym A!', date: '3 Apr' },
    ],
    initMessages: [
      { id: 1, author: 'Sonia M.',    color: '#F59E0B', text: 'Girls, who hasnt signed up for Monday yet?', time: '11:00', mine: false },
    ],
  },
  {
    id: 'football',
    name: t.community.clubs_data.football.name,
    emoji: '⚽',
    color: '#10B981',
    members: 56,
    description: t.community.clubs_data.football.desc,
    schedule: [
      { day: t.dashboard.days.tue, time: '18:00\u201320:00', type: 'Practice (Field 1)' },
      { day: t.dashboard.days.thu, time: '18:00\u201320:00', type: 'Tactics + Sparring' },
      { day: t.dashboard.days.sun, time: '11:00\u201313:00', type: 'Match (League)' },
    ],
    announcements: [
      { text: 'Won against KNU 3:1! Well done! 🏆', date: '1 Apr' },
    ],
    initMessages: [
      { id: 1, author: 'Max P.',  color: '#10B981', text: 'GOAL!!! 3:1 🔥', time: '15:30', mine: false },
    ],
  },
  {
    id: 'debates',
    name: t.community.clubs_data.debates.name,
    emoji: '🎤',
    color: '#3B82F6',
    members: 31,
    description: t.community.clubs_data.debates.desc,
    schedule: [
      { day: t.dashboard.days.wed, time: '17:30\u201320:00', type: 'Open debate' },
      { day: t.dashboard.days.sat, time: '11:00\u201313:00', type: 'Masterclass' },
    ],
    announcements: [
      { text: 'Theme: "AI will replace lawyers?" — April 10.', date: '3 Apr' },
    ],
    initMessages: [
      { id: 1, author: 'Alina Sh.',   color: '#3B82F6', text: 'Who is ready to debate AI? 😄', time: '16:00', mine: false },
    ],
  },
  {
    id: 'running',
    name: t.community.clubs_data.running.name,
    emoji: '🏃',
    color: '#06B6D4',
    members: 47,
    description: t.community.clubs_data.running.desc,
    schedule: [
      { day: t.dashboard.days.mon, time: '07:00\u201308:00', type: 'Morning run (6–8 km)' },
      { day: t.dashboard.days.wed, time: '07:00\u201308:00', type: 'Interval training' },
      { day: t.dashboard.days.sat, time: '08:00\u201310:00', type: 'Long run (12–16 km)' },
    ],
    announcements: [
      { text: 'Kyiv Half Marathon April 25 — KSE team participates!', date: '2 Apr' },
    ],
    initMessages: [
      { id: 1, author: 'Katya L.',    color: '#06B6D4', text: 'Who is coming on Saturday? Planning 14km 🏃', time: '20:00', mine: false },
    ],
  },
];

// ─── Chat Component ───────────────────────────────────────────────────────────
function ClubChat({ club }) {
  const { t } = useApp();
  const [messages, setMessages] = useState(club.initMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), author: 'Ви', color: '#6B21A8', text, time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }), mine: true },
    ]);
    setInput('');
  };

  return (
    <div className="club-chat-layout">
      <div className="club-chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`club-msg ${msg.mine ? 'mine' : 'theirs'}`}>
            {!msg.mine && (
              <div className="club-msg-avatar" style={{ background: msg.color }}>
                {msg.author[0]}
              </div>
            )}
            <div className="club-msg-body">
              {!msg.mine && <span className="club-msg-author">{msg.author}</span>}
              <div className={`club-msg-bubble ${msg.mine ? 'bubble-mine' : 'bubble-theirs'}`}>
                {msg.text}
              </div>
              <span className="club-msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="club-chat-input-bar">
        <input
          className="club-chat-input"
          placeholder={`${t.community.typeMessage}${club.name}…`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button className="club-chat-send btn-primary" onClick={sendMessage} disabled={!input.trim()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Info Component ───────────────────────────────────────────────────────────
function ClubInfo({ club }) {
  const { t } = useApp();
  return (
    <div className="club-info-layout">
      <div className="club-info-hero glass-panel">
        <div className="club-info-emoji">{club.emoji}</div>
        <div>
          <h2 className="club-info-title">{club.name}</h2>
          <div className="club-info-meta">
            <span><Users size={14} /> {club.members} {t.community.members}</span>
          </div>
          <p className="club-info-desc">{club.description}</p>
        </div>
      </div>

      <div className="club-info-grid">
        {/* Schedule */}
        <div className="club-info-card glass-panel">
          <div className="club-info-card-header">
            <Calendar size={16} />
            <h3>{t.community.schedule}</h3>
          </div>
          <div className="club-schedule-list">
            {club.schedule.map((s, i) => (
              <div key={i} className="club-schedule-item">
                <div className="schedule-day">{s.day}</div>
                <div className="schedule-details">
                  <span className="schedule-time"><Clock size={12} />{s.time}</span>
                  <span className="schedule-type">{s.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="club-info-card glass-panel">
          <div className="club-info-card-header">
            <Info size={16} />
            <h3>{t.community.announcements}</h3>
          </div>
          <div className="club-announcements-list">
            {club.announcements.map((a, i) => (
              <div key={i} className="club-announcement-item">
                <div className="announcement-dot" style={{ background: club.color }} />
                <div className="announcement-content">
                  <p>{a.text}</p>
                  <span className="announcement-date">{a.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Club Detail Page ─────────────────────────────────────────────────────────
function ClubPage({ club, onBack }) {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="club-page animate-in">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={15} /> {t.community.back}
      </button>

      <div className="club-page-header glass-panel">
        <div className="club-page-avatar" style={{ background: `${club.color}22`, border: `2px solid ${club.color}44` }}>
          <span style={{ fontSize: '2rem' }}>{club.emoji}</span>
        </div>
        <div className="club-page-info">
          <h1 className="club-page-title">{club.name}</h1>
          <div className="club-page-meta">
            <span className="club-meta-chip" style={{ color: club.color }}>
              <Users size={13} /> {club.members} {t.community.members}
            </span>
          </div>
        </div>
      </div>

      <div className="community-tabs">
        <button
          className={`community-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
          style={{ '--tab-color': club.color }}
        >
          <Info size={15} /> {t.community.tabInfo}
        </button>
        <button
          className={`community-tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
          style={{ '--tab-color': club.color }}
        >
          <MessageSquare size={15} /> {t.community.tabChat}
        </button>
      </div>

      <div className="club-tab-content animate-in">
        {activeTab === 'chat' && <ClubChat club={club} />}
        {activeTab === 'info' && <ClubInfo club={club} />}
      </div>
    </div>
  );
}

// ─── Community Home ───────────────────────────────────────────────────────────
export default function Community() {
  const { t } = useApp();
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const CLUBS = getClubs(t);

  if (selectedClub) {
    return (
      <ClubPage
        key={selectedClub.id}
        club={selectedClub}
        onBack={() => setSelectedClub(null)}
      />
    );
  }

  const filtered = CLUBS.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-view animate-in">
      <div className="community-header">
        <div>
          <h1 className="community-title">{t.community.title}</h1>
          <p className="community-subtitle">{t.community.subtitle}</p>
        </div>
        <div className="community-search glass-panel">
          <Search size={16} className="text-muted" />
          <input
            className="community-search-input"
            placeholder={t.community.search}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="community-stats-row">
        <div className="community-stat glass-panel">
          <span className="community-stat-value">{CLUBS.length}</span>
          <span className="community-stat-label">{t.community.clubs}</span>
        </div>
        <div className="community-stat glass-panel">
          <span className="community-stat-value">{CLUBS.reduce((a, c) => a + c.members, 0)}</span>
          <span className="community-stat-label">{t.community.members}</span>
        </div>
        <div className="community-stat glass-panel">
          <span className="community-stat-value">6</span>
          <span className="community-stat-label">{t.community.events}</span>
        </div>
      </div>

      <div className="community-clubs-grid">
        {filtered.map(club => (
          <button
            key={club.id}
            className="club-card glass-panel"
            onClick={() => setSelectedClub(club)}
          >
            <div className="club-card-emoji-wrap" style={{ background: `${club.color}18` }}>
              <span className="club-card-emoji">{club.emoji}</span>
              <div className="club-card-glow" style={{ background: club.color }} />
            </div>
            <div className="club-card-body">
              <h3 className="club-card-name">{club.name}</h3>
              <p className="club-card-desc">{club.description.slice(0, 80)}…</p>
              <div className="club-card-footer">
                <span className="club-card-members" style={{ color: club.color }}>
                  <Users size={13} /> {club.members}
                </span>
                <span className="club-card-join">
                  {t.community.join} <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="community-empty glass-panel">
          <Search size={32} className="text-muted" />
          <p>{t.community.empty}</p>
        </div>
      )}
    </div>
  );
}
