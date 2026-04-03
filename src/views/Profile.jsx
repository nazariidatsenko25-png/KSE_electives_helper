import React, { useState, useEffect, useRef } from 'react';
import {
  User, Mail, BookOpen, GraduationCap, Calendar,
  Edit3, Camera, Save, X, Star, MessageSquare, Clock,
  Award, FileText, Linkedin, Shield, ShieldOff, Trash2,
  Send, Lock, Globe, Image, Smile, ChevronDown, Check
} from 'lucide-react';
import { fetchWithAuth } from '../utils/api';
import { useApp } from '../context/AppContext';

// ─── Predefined avatar options ───────────────────────────────────────────────
const AVATAR_COLORS = [
  '#6B21A8','#2563EB','#059669','#D97706',
  '#DC2626','#0891B2','#7C3AED','#DB2777',
  '#4F46E5','#0D9488','#EA580C','#9333EA',
];

const AVATAR_EMOJIS = ['🦁','🐯','🦊','🐺','🦝','🐻','🐼','🦄','🐸','🐙','🦋','🌟'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)   return 'щойно';
  if (diff < 3600) return `${Math.floor(diff / 60)} хв тому`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} год тому`;
  return `${Math.floor(diff / 86400)} дн тому`;
}

function renderStars(rating) {
  return (
    <div className="profile-stars">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13}
          fill={i <= rating ? '#F59E0B' : 'transparent'}
          color={i <= rating ? '#F59E0B' : 'var(--text-muted)'}
        />
      ))}
    </div>
  );
}

// ─── Avatar display (reused in multiple places) ───────────────────────────────
function AvatarDisplay({ profile, size = 80, className = '' }) {
  const s = { width: size, height: size, fontSize: size * 0.45, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' };
  if (profile.avatarType === 'image' && profile.avatarImage) {
    return <img src={profile.avatarImage} alt="avatar" style={{ ...s, objectFit: 'cover' }} className={className} />;
  }
  if (profile.avatarType === 'emoji' && profile.avatarEmoji) {
    return <div style={{ ...s, background: '#1f2937', border: '2px solid var(--border)' }} className={className}>{profile.avatarEmoji}</div>;
  }
  return (
    <div style={{ ...s, background: profile.avatarColor || '#6B21A8' }} className={className}>
      <User size={size * 0.45} color="white" />
    </div>
  );
}

// ─── Avatar Picker Modal ──────────────────────────────────────────────────────
function AvatarPicker({ profile, onSave, onClose }) {
  const [tab, setTab] = useState(profile.avatarType || 'color');
  const [selectedColor, setSelectedColor] = useState(profile.avatarColor);
  const [selectedEmoji, setSelectedEmoji] = useState(profile.avatarEmoji);
  const [imageBase64, setImageBase64] = useState(profile.avatarImage || null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageBase64(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (tab === 'color') onSave({ avatarType: 'color', avatarColor: selectedColor });
    else if (tab === 'emoji') onSave({ avatarType: 'emoji', avatarEmoji: selectedEmoji });
    else if (tab === 'image' && imageBase64) onSave({ avatarType: 'image', avatarImage: imageBase64 });
    onClose();
  };

  const previewProfile = {
    avatarType: tab,
    avatarColor: selectedColor,
    avatarEmoji: selectedEmoji,
    avatarImage: imageBase64,
  };

  return (
    <div className="avatar-modal-overlay" onClick={onClose}>
      <div className="avatar-modal glass-panel" onClick={e => e.stopPropagation()}>
        <div className="avatar-modal-header">
          <h3>Змінити аватар</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="avatar-preview-center">
          <AvatarDisplay profile={previewProfile} size={96} />
        </div>

        <div className="avatar-tabs">
          {[
            { key: 'color', icon: <div className="color-dot" style={{background:'#6B21A8'}} />, label: 'Колір' },
            { key: 'emoji', icon: <Smile size={15} />, label: 'Емодзі' },
            { key: 'image', icon: <Image size={15} />, label: 'Фото' },
          ].map(t => (
            <button key={t.key} className={`avatar-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="avatar-tab-content">
          {tab === 'color' && (
            <div className="color-grid">
              {AVATAR_COLORS.map(c => (
                <button key={c} className={`color-swatch ${selectedColor === c ? 'selected' : ''}`}
                  style={{ background: c }} onClick={() => setSelectedColor(c)}>
                  {selectedColor === c && <Check size={14} color="white" />}
                </button>
              ))}
            </div>
          )}
          {tab === 'emoji' && (
            <div className="emoji-grid">
              {AVATAR_EMOJIS.map(em => (
                <button key={em} className={`emoji-swatch ${selectedEmoji === em ? 'selected' : ''}`}
                  onClick={() => setSelectedEmoji(em)}>{em}</button>
              ))}
            </div>
          )}
          {tab === 'image' && (
            <div className="image-upload-area">
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              {imageBase64 ? (
                <div className="image-preview-wrap">
                  <img src={imageBase64} alt="preview" className="image-preview-thumb" />
                  <button className="btn-secondary btn-sm" onClick={() => setImageBase64(null)}>
                    <X size={13} /> Видалити
                  </button>
                </div>
              ) : (
                <button className="upload-zone" onClick={() => fileRef.current?.click()}>
                  <Camera size={28} />
                  <span>Клацніть для вибору фото</span>
                  <span className="upload-hint">JPG, PNG до 5MB</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="avatar-modal-footer">
          <button className="btn-secondary" onClick={onClose}>Скасувати</button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={14} /> Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Wall ─────────────────────────────────────────────────────────────
function ProfileWall({ ownerName, isPrivate, currentUser, wallPosts, addWallPost, deleteWallPost, isOwner }) {
  const [text, setText] = useState('');

  if (isPrivate && !isOwner) {
    return (
      <div className="profile-card glass-panel">
        <div className="private-placeholder">
          <Lock size={24} />
          <p>Стіна прихована — профіль приватний</p>
        </div>
      </div>
    );
  }

  const handlePost = () => {
    const t = text.trim();
    if (!t) return;
    const name = currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Анонім';
    const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    addWallPost(t, name, color);
    setText('');
  };

  return (
    <div className="profile-card glass-panel">
      <div className="profile-card-header">
        <MessageSquare size={18} className="profile-card-icon" />
        <h2>Стіна профілю</h2>
        <span className="reviews-count">{wallPosts.length}</span>
      </div>

      {/* Post form */}
      <div className="wall-post-form">
        <div className="wall-input-row">
          <div className="wall-avatar-mini" style={{ background: '#6B21A8' }}>
            <User size={12} color="white" />
          </div>
          <input
            className="wall-input"
            placeholder={currentUser ? `Напишіть щось для ${ownerName}...` : 'Увійдіть, щоб залишити повідомлення'}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handlePost()}
            disabled={!currentUser}
            maxLength={300}
          />
          <button className="wall-send-btn btn-primary" onClick={handlePost} disabled={!currentUser || !text.trim()}>
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* Posts list */}
      <div className="wall-posts-list">
        {wallPosts.length === 0 ? (
          <div className="wall-empty">
            <MessageSquare size={28} />
            <p>Стіна порожня. Будьте першим!</p>
          </div>
        ) : wallPosts.map(post => (
          <div key={post.id} className="wall-post-item">
            <div className="wall-post-avatar" style={{ background: post.authorColor }}>
              {post.author[0]}
            </div>
            <div className="wall-post-body">
              <div className="wall-post-meta">
                <span className="wall-post-author">{post.author}</span>
                <span className="wall-post-time">
                  <Clock size={11} /> {timeAgo(post.timestamp)}
                </span>
                {isOwner && (
                  <button className="wall-delete-btn" onClick={() => deleteWallPost(post.id)} title="Видалити">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              <p className="wall-post-text">{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Profile Component ──────────────────────────────────────────────────
const Profile = ({ user }) => {
  const { userProfile, updateUserProfile, wallPosts, addWallPost, deleteWallPost } = useApp();

  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [editingLinkedIn, setEditingLinkedIn] = useState(false);
  const [linkedInInput, setLinkedInInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'comments' | 'wall'

  // Load reviews
  useEffect(() => {
    if (!user) { setLoadingReviews(false); return; }
    fetchWithAuth('/api/reviews/?my=true', { suppressAuthRedirect: true })
      .then(data => setReviews(Array.isArray(data) ? data : (data.results || [])))
      .catch(() => setReviews([
        { id: 1, course: { code: 'CS301', title: 'Бази даних' }, grade: 'A-', rating_quality: 5, rating_difficulty: 3, rating_workload: 4, comment: 'Дуже корисний курс! Практичні завдання допомогли зрозуміти SQL та NoSQL підходи.', created_at: '2026-01-15T10:30:00Z' },
        { id: 2, course: { code: 'ECON301', title: 'Поведінкова економіка' }, grade: 'A-', rating_quality: 4, rating_difficulty: 4, rating_workload: 3, comment: 'Цікавий матеріал, але іноді лекції були трохи затягнуті.', created_at: '2026-01-20T14:00:00Z' },
        { id: 3, course: { code: 'CS302', title: 'Веб-розробка' }, grade: 'A', rating_quality: 5, rating_difficulty: 2, rating_workload: 3, comment: 'Найкращий курс семестру! React, Node.js — все актуальне і по справі.', created_at: '2026-02-01T09:15:00Z' },
      ]))
      .finally(() => setLoadingReviews(false));
  }, [user]);

  if (!user) {
    return (
      <div className="profile-view animate-in centered">
        <div className="glass-panel text-center" style={{ padding: '3rem' }}>
          <User size={48} className="text-muted mb-md" />
          <h2 className="heading-2">Увійдіть до системи</h2>
          <p className="text-muted">Щоб переглянути свій профіль, увійдіть через Google.</p>
        </div>
      </div>
    );
  }

  const getAvgRating = (r) => ((r.rating_quality + r.rating_difficulty + r.rating_workload) / 3).toFixed(1);
  const isPrivate = userProfile.isPrivate;

  return (
    <div className="profile-view animate-in">

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <AvatarPicker
          profile={userProfile}
          onSave={updateUserProfile}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}

      {/* ── HERO ── */}
      <div className="profile-hero glass-panel">
        <div className="profile-hero-bg" />
        <div className="profile-hero-content">

          {/* Avatar */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper" onClick={() => setShowAvatarPicker(true)} title="Змінити аватар">
              <AvatarDisplay profile={userProfile} size={88} />
              <div className="avatar-edit-overlay"><Camera size={18} /></div>
            </div>
          </div>

          {/* Hero info */}
          <div className="profile-hero-info">
            <h1 className="profile-full-name">{user.first_name} {user.last_name}</h1>
            <div className="profile-hero-badges">
              <span className="profile-major-badge"><GraduationCap size={15} />{user.major || 'Студент'}</span>
              {user.gpa && (
                <span className="profile-major-badge gpa-badge"><Star size={15} fill="#F59E0B" color="#F59E0B" />GPA: {user.gpa}</span>
              )}
              <span className={`privacy-chip ${isPrivate ? 'private' : 'public'}`}>
                {isPrivate ? <><Lock size={12} />Приватний</> : <><Globe size={12} />Публічний</>}
              </span>
            </div>

            {/* Last seen */}
            <div className="last-seen-row">
              <span className="online-dot" />
              <span className="last-seen-text">
                Онлайн: {timeAgo(userProfile.lastSeen)}
              </span>
            </div>

            {/* LinkedIn */}
            {!editingLinkedIn ? (
              <div className="linkedin-row">
                {userProfile.linkedIn ? (
                  <a href={userProfile.linkedIn} target="_blank" rel="noreferrer" className="linkedin-link">
                    <Linkedin size={14} /> LinkedIn профіль
                  </a>
                ) : (
                  <span className="linkedin-empty">Немає LinkedIn</span>
                )}
                <button className="icon-btn-sm" onClick={() => { setLinkedInInput(userProfile.linkedIn || ''); setEditingLinkedIn(true); }}>
                  <Edit3 size={13} />
                </button>
              </div>
            ) : (
              <div className="linkedin-edit-row">
                <Linkedin size={14} className="text-muted" />
                <input
                  className="profile-input"
                  value={linkedInInput}
                  onChange={e => setLinkedInInput(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  autoFocus
                />
                <button className="icon-btn-sm success" onClick={() => { updateUserProfile({ linkedIn: linkedInInput }); setEditingLinkedIn(false); }}><Check size={14} /></button>
                <button className="icon-btn-sm" onClick={() => setEditingLinkedIn(false)}><X size={14} /></button>
              </div>
            )}
          </div>

          {/* Privacy toggle */}
          <div className="profile-hero-actions">
            <button
              className={`privacy-toggle-btn ${isPrivate ? 'is-private' : 'is-public'}`}
              onClick={() => updateUserProfile({ isPrivate: !isPrivate })}
              title={isPrivate ? 'Зробити публічним' : 'Зробити приватним'}
            >
              {isPrivate ? <><ShieldOff size={15} />Зробити публічним</> : <><Shield size={15} />Зробити приватним</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="profile-tabs">
        {[
          { key: 'info',     label: 'Профіль',    icon: <FileText size={15} /> },
          { key: 'comments', label: 'Коментарі',  icon: <MessageSquare size={15} />, count: reviews.length },
          { key: 'wall',     label: 'Стіна',       icon: <Globe size={15} />, count: wallPosts.length },
        ].map(tab => (
          <button key={tab.key} className={`profile-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}>
            {tab.icon} {tab.label}
            {tab.count != null && <span className="tab-count">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="profile-tab-content animate-in">

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="profile-grid">
            {/* Left */}
            <div className="profile-left">
              {/* Personal Info */}
              <div className="profile-card glass-panel">
                <div className="profile-card-header">
                  <FileText size={18} className="profile-card-icon" />
                  <h2>Особиста інформація</h2>
                </div>
                <div className="profile-info-list">
                  <div className="profile-info-item">
                    <div className="info-icon-wrap"><Mail size={15} /></div>
                    <div className="info-details">
                      <span className="info-label">Email</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <div className="info-icon-wrap"><BookOpen size={15} /></div>
                    <div className="info-details">
                      <span className="info-label">Спеціальність</span>
                      <span className="info-value">{user.major || 'Не вказано'}</span>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <div className="info-icon-wrap"><Calendar size={15} /></div>
                    <div className="info-details">
                      <span className="info-label">Рік навчання</span>
                      <span className="info-value">{user.current_year}-й курс</span>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <div className="info-icon-wrap"><Award size={15} /></div>
                    <div className="info-details" style={{ width: '100%' }}>
                      <span className="info-label">Кредити</span>
                      <div className="credits-row">
                        <span className="credits-value">{user.total_credits || 0}</span>
                        <span className="credits-sep">/ {user.creditsRequired || 240} ECTS</span>
                      </div>
                      <div className="credits-bar-bg">
                        <div className="credits-bar-fill"
                          style={{ width: `${Math.min(100, ((user.total_credits || 0) / (user.creditsRequired || 240)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Settings Card */}
              <div className="profile-card glass-panel">
                <div className="profile-card-header">
                  <Shield size={18} className="profile-card-icon" />
                  <h2>Конфіденційність</h2>
                </div>
                <div className="privacy-settings-list">
                  <div className="privacy-setting-item">
                    <div className="privacy-setting-info">
                      <span className="privacy-setting-title">
                        {isPrivate ? <><Lock size={14} /> Приватний профіль</> : <><Globe size={14} /> Публічний профіль</>}
                      </span>
                      <span className="privacy-setting-desc">
                        {isPrivate
                          ? 'Ваші коментарі та стіна приховані від інших користувачів'
                          : 'Інші можуть бачити вашу стіну та коментарі до курсів'}
                      </span>
                    </div>
                    <button
                      className={`toggle-switch ${isPrivate ? 'on' : 'off'}`}
                      onClick={() => updateUserProfile({ isPrivate: !isPrivate })}
                    >
                      <div className="toggle-thumb" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Bio */}
            <div className="profile-right">
              <div className="profile-card glass-panel">
                <div className="profile-card-header">
                  <Edit3 size={18} className="profile-card-icon" />
                  <h2>Про мене</h2>
                  {!editingBio && (
                    <button className="bio-edit-btn" onClick={() => { setBioInput(userProfile.bio); setEditingBio(true); }}>
                      <Edit3 size={13} /> Редагувати
                    </button>
                  )}
                </div>
                {editingBio ? (
                  <div className="bio-edit-area">
                    <textarea
                      className="bio-textarea"
                      value={bioInput}
                      onChange={e => setBioInput(e.target.value)}
                      placeholder="Розкажіть про себе, свої інтереси та цілі..."
                      rows={5}
                      maxLength={500}
                      autoFocus
                    />
                    <div className="bio-edit-actions">
                      <span className="bio-char-count">{bioInput.length}/500</span>
                      <div className="bio-btns">
                        <button className="btn-secondary btn-sm" onClick={() => setEditingBio(false)}><X size={13} /> Скасувати</button>
                        <button className="btn-primary btn-sm" onClick={() => { updateUserProfile({ bio: bioInput }); setEditingBio(false); }}><Save size={13} /> Зберегти</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className={`bio-text ${!userProfile.bio ? 'empty' : ''}`}>
                    {userProfile.bio || 'Натисніть «Редагувати», щоб додати інформацію про себе.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* COMMENTS TAB */}
        {activeTab === 'comments' && (
          <div className="profile-card glass-panel">
            <div className="profile-card-header">
              <MessageSquare size={18} className="profile-card-icon" />
              <h2>Мої коментарі до курсів</h2>
              <span className="reviews-count">{reviews.length}</span>
            </div>
            {isPrivate ? (
              <div className="private-placeholder">
                <Lock size={22} />
                <p>Коментарі приховані — профіль приватний</p>
                <span className="text-muted">Тільки ви бачите цей розділ</span>
              </div>
            ) : loadingReviews ? (
              <div className="profile-loading"><div className="profile-spinner" /><span className="text-muted">Завантаження...</span></div>
            ) : reviews.length === 0 ? (
              <div className="profile-empty-reviews">
                <MessageSquare size={32} className="text-muted" />
                <p className="text-muted">Ви ще не залишили жодного коментаря.</p>
              </div>
            ) : (
              <div className="profile-reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="profile-review-card">
                    <div className="review-card-top">
                      <div className="review-course-info">
                        <span className="review-course-code">{review.course?.code || 'N/A'}</span>
                        <div className="review-title-row">
                          <span className="review-course-title">{review.course?.title || 'Курс'}</span>
                          {review.grade && (
                            <span className="review-grade-badge"><Award size={12} />{review.grade}</span>
                          )}
                        </div>
                      </div>
                      <div className="review-avg-badge">
                        <Star size={12} fill="#F59E0B" color="#F59E0B" />
                        {getAvgRating(review)}
                      </div>
                    </div>
                    <div className="review-ratings-row">
                      <div className="review-rating-mini"><span className="rating-mini-label">Якість</span>{renderStars(review.rating_quality)}</div>
                      <div className="review-rating-mini"><span className="rating-mini-label">Складність</span>{renderStars(review.rating_difficulty)}</div>
                      <div className="review-rating-mini"><span className="rating-mini-label">Навантаження</span>{renderStars(review.rating_workload)}</div>
                    </div>
                    {review.comment && <p className="review-comment-text">«{review.comment}»</p>}
                    <div className="review-date"><Clock size={11} />{formatDate(review.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WALL TAB */}
        {activeTab === 'wall' && (
          <ProfileWall
            ownerName={user.first_name}
            isPrivate={isPrivate}
            currentUser={user}
            wallPosts={wallPosts}
            addWallPost={addWallPost}
            deleteWallPost={deleteWallPost}
            isOwner={true}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
