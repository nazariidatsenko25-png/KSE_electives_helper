import React, { useState, useEffect, useRef } from 'react';
import {
    User, Mail, BookOpen, GraduationCap, Calendar,
    Edit3, Camera, Save, X, Star, MessageSquare, Clock,
    ChevronRight, Award, FileText
} from 'lucide-react';
import { fetchWithAuth } from '../utils/api';

const Profile = ({ user, onUpdateUser }) => {
    const [bio, setBio] = useState('');
    const [editingBio, setEditingBio] = useState(false);
    const [bioInput, setBioInput] = useState('');
    const [avatarColor, setAvatarColor] = useState('#6B21A8');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const colorPickerRef = useRef(null);

    const avatarColors = [
        '#6B21A8', '#2563EB', '#059669', '#D97706',
        '#DC2626', '#0891B2', '#7C3AED', '#DB2777',
        '#4F46E5', '#0D9488', '#EA580C', '#9333EA',
    ];

    // Load saved bio and avatar color from localStorage
    useEffect(() => {
        if (user) {
            const savedBio = localStorage.getItem(`profile_bio_${user.id}`);
            const savedColor = localStorage.getItem(`profile_avatar_${user.id}`);
            if (savedBio) setBio(savedBio);
            if (savedColor) setAvatarColor(savedColor);
        }
    }, [user]);

    // Fetch user's reviews
    useEffect(() => {
        if (user) {
            fetchWithAuth('/api/reviews/?my=true', { suppressAuthRedirect: true })
                .then(data => {
                    setReviews(Array.isArray(data) ? data : (data.results || []));
                })
                .catch(() => {
                    // Fall back to mock reviews if backend unavailable
                    setReviews([
                        {
                            id: 1,
                            course: { code: 'CS301', title: 'Бази даних' },
                            grade: 'A-',
                            rating_quality: 5,
                            rating_difficulty: 3,
                            rating_workload: 4,
                            comment: 'Дуже корисний курс! Практичні завдання допомогли зрозуміти SQL та NoSQL підходи.',
                            created_at: '2026-01-15T10:30:00Z',
                        },
                        {
                            id: 2,
                            course: { code: 'ECON301', title: 'Поведінкова економіка' },
                            grade: 'A-',
                            rating_quality: 4,
                            rating_difficulty: 4,
                            rating_workload: 3,
                            comment: 'Цікавий матеріал, але іноді лекції були трохи затягнуті.',
                            created_at: '2026-01-20T14:00:00Z',
                        },
                        {
                            id: 3,
                            course: { code: 'CS302', title: 'Веб-розробка' },
                            grade: 'A',
                            rating_quality: 5,
                            rating_difficulty: 2,
                            rating_workload: 3,
                            comment: 'Найкращий курс семестру! React, Node.js — все актуальне і по справі.',
                            created_at: '2026-02-01T09:15:00Z',
                        },
                    ]);
                })
                .finally(() => setLoadingReviews(false));
        }
    }, [user]);

    // Close color picker on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSaveBio = () => {
        setBio(bioInput);
        localStorage.setItem(`profile_bio_${user.id}`, bioInput);
        setEditingBio(false);
    };

    const handleEditBio = () => {
        setBioInput(bio);
        setEditingBio(true);
    };

    const handleCancelBio = () => {
        setBioInput(bio);
        setEditingBio(false);
    };

    const handleColorSelect = (color) => {
        setAvatarColor(color);
        localStorage.setItem(`profile_avatar_${user.id}`, color);
        setShowColorPicker(false);
    };

    const getAvgRating = (review) => {
        return ((review.rating_quality + review.rating_difficulty + review.rating_workload) / 3).toFixed(1);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const renderStars = (rating) => {
        return (
            <div className="profile-stars">
                {[1, 2, 3, 4, 5].map(i => (
                    <Star
                        key={i}
                        size={14}
                        fill={i <= rating ? '#F59E0B' : 'transparent'}
                        color={i <= rating ? '#F59E0B' : 'var(--text-muted)'}
                    />
                ))}
            </div>
        );
    };

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

    return (
        <div className="profile-view animate-in">
            {/* Hero Section */}
            <div className="profile-hero glass-panel">
                <div className="profile-hero-bg" />
                <div className="profile-hero-content">
                    <div className="profile-avatar-section" ref={colorPickerRef}>
                        <div
                            className="profile-avatar-large"
                            style={{ background: avatarColor }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                        >
                            <User size={40} />
                            <div className="avatar-edit-overlay">
                                <Camera size={18} />
                            </div>
                        </div>
                        {showColorPicker && (
                            <div className="avatar-color-picker glass-panel">
                                <span className="color-picker-label">Оберіть колір аватара</span>
                                <div className="color-grid">
                                    {avatarColors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-swatch ${avatarColor === color ? 'active' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => handleColorSelect(color)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="profile-hero-info">
                        <h1 className="profile-full-name">
                            {user.first_name} {user.last_name}
                        </h1>
                        <span className="profile-major-badge">
                            <GraduationCap size={16} />
                            {user.major || 'Студент'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="profile-grid">
                {/* Left Column */}
                <div className="profile-left">
                    {/* Info Card */}
                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <FileText size={18} className="profile-card-icon" />
                            <h2>Особиста інформація</h2>
                        </div>
                        <div className="profile-info-list">
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <Mail size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{user.email}</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <BookOpen size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">Спеціальність</span>
                                    <span className="info-value">{user.major || 'Не вказано'}</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <Calendar size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">Рік навчання</span>
                                    <span className="info-value">{user.current_year}-й курс</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <Award size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">Кредити</span>
                                    <span className="info-value">{user.total_credits || 0} ECTS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio Card */}
                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <Edit3 size={18} className="profile-card-icon" />
                            <h2>Про мене</h2>
                            {!editingBio && (
                                <button className="bio-edit-btn" onClick={handleEditBio}>
                                    <Edit3 size={14} />
                                    Редагувати
                                </button>
                            )}
                        </div>
                        {editingBio ? (
                            <div className="bio-edit-area">
                                <textarea
                                    className="bio-textarea"
                                    value={bioInput}
                                    onChange={(e) => setBioInput(e.target.value)}
                                    placeholder="Розкажіть про себе, свої інтереси та цілі..."
                                    rows={4}
                                    maxLength={500}
                                    autoFocus
                                />
                                <div className="bio-edit-actions">
                                    <span className="bio-char-count">{bioInput.length}/500</span>
                                    <div className="bio-btns">
                                        <button className="btn-secondary btn-sm" onClick={handleCancelBio}>
                                            <X size={14} /> Скасувати
                                        </button>
                                        <button className="btn-primary btn-sm" onClick={handleSaveBio}>
                                            <Save size={14} /> Зберегти
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className={`bio-text ${!bio ? 'empty' : ''}`}>
                                {bio || 'Натисніть «Редагувати», щоб додати інформацію про себе.'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Column — Reviews */}
                <div className="profile-right">
                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <MessageSquare size={18} className="profile-card-icon" />
                            <h2>Мої оцінювання курсів</h2>
                            <span className="reviews-count">{reviews.length}</span>
                        </div>

                        {loadingReviews ? (
                            <div className="profile-loading">
                                <div className="profile-spinner" />
                                <span className="text-muted">Завантаження...</span>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="profile-empty-reviews">
                                <MessageSquare size={32} className="text-muted" />
                                <p className="text-muted">Ви ще не залишили жодного оцінювання.</p>
                            </div>
                        ) : (
                            <div className="profile-reviews-list">
                                {reviews.map(review => (
                                    <div key={review.id} className="profile-review-card">
                                        <div className="review-card-top">
                                            <div className="review-course-info">
                                                <span className="review-course-code">
                                                    {review.course?.code || 'N/A'}
                                                </span>
                                                <div className="review-title-row">
                                                    <span className="review-course-title">
                                                        {review.course?.title || 'Курс'}
                                                    </span>
                                                    {review.grade && (
                                                        <span className="review-grade-badge">
                                                            <Award size={13} />
                                                            {review.grade}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="review-avg-badge">
                                                <Star size={12} fill="#F59E0B" color="#F59E0B" />
                                                {getAvgRating(review)}
                                            </div>
                                        </div>

                                        <div className="review-ratings-row">
                                            <div className="review-rating-mini">
                                                <span className="rating-mini-label">Якість</span>
                                                {renderStars(review.rating_quality)}
                                            </div>
                                            <div className="review-rating-mini">
                                                <span className="rating-mini-label">Складність</span>
                                                {renderStars(review.rating_difficulty)}
                                            </div>
                                            <div className="review-rating-mini">
                                                <span className="rating-mini-label">Навантаження</span>
                                                {renderStars(review.rating_workload)}
                                            </div>
                                        </div>

                                        {review.comment && (
                                            <p className="review-comment-text">
                                                «{review.comment}»
                                            </p>
                                        )}

                                        <div className="review-date">
                                            <Clock size={12} />
                                            {formatDate(review.created_at)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
