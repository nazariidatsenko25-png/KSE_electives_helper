import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Clock, Users, Star, Search, ChevronDown, Lock, Heart, Loader2, MessageCircle, Send, X, User, GraduationCap, Calendar, Mail } from 'lucide-react';
import { mockCatalog, mockComments, mockUsers } from '../data/mockData';
import { fetchWithAuth } from '../utils/api';

const CourseCatalog = ({ user }) => {
    const [search, setSearch] = useState('');
    const [filterDept, setFilterDept] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [expanded, setExpanded] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());
    const [loadingWishlist, setLoadingWishlist] = useState(new Set());
    const [comments, setComments] = useState(() => {
        // Deep copy mock comments as initial state
        const initial = {};
        for (const [courseId, cmts] of Object.entries(mockComments)) {
            initial[courseId] = [...cmts];
        }
        return initial;
    });
    const [commentInputs, setCommentInputs] = useState({});
    const [profilePopup, setProfilePopup] = useState(null); // userId to show popup for
    const popupRef = useRef(null);

    const departments = [...new Set(mockCatalog.map(c => c.department))];

    const getUserById = (userId) => mockUsers.find(u => u.id === userId);

    const formatTimeAgo = (timestamp) => {
        const now = new Date('2027-01-20T12:00:00Z'); // Mock "now" aligned with mock data
        const date = new Date(timestamp);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays}д тому`;
        if (diffHours > 0) return `${diffHours}год тому`;
        if (diffMins > 0) return `${diffMins}хв тому`;
        return 'щойно';
    };

    // Close profile popup on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setProfilePopup(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Fetch existing wishlist on mount
    useEffect(() => {
        if (user) {
            fetchWithAuth('/api/wishlist/', { suppressAuthRedirect: true })
                .then(data => {
                    const ids = new Set(data.map(item => item.course));
                    setWishlist(ids);
                })
                .catch(err => console.warn('Wishlist fetch unavailable (mock mode):', err.message));
        }
    }, [user]);

    const handleWishlistToggle = async (e, course) => {
        e.stopPropagation();
        const courseId = course.id;
        const isWishlisted = wishlist.has(courseId);

        setLoadingWishlist(prev => new Set(prev).add(courseId));

        try {
            if (isWishlisted) {
                await fetchWithAuth(`/api/wishlist/${courseId}/`, {
                    method: 'DELETE',
                    suppressAuthRedirect: true,
                });
                setWishlist(prev => {
                    const next = new Set(prev);
                    next.delete(courseId);
                    return next;
                });
            } else {
                await fetchWithAuth('/api/wishlist/', {
                    method: 'POST',
                    suppressAuthRedirect: true,
                    body: JSON.stringify({ course: courseId }),
                });
                setWishlist(prev => new Set(prev).add(courseId));
            }
        } catch (err) {
            console.error('Wishlist toggle error:', err);
        } finally {
            setLoadingWishlist(prev => {
                const next = new Set(prev);
                next.delete(courseId);
                return next;
            });
        }
    };

    const handleCommentSubmit = (e, courseId) => {
        e.preventDefault();
        e.stopPropagation();
        const text = (commentInputs[courseId] || '').trim();
        if (!text) return;

        const newComment = {
            id: Date.now(),
            userId: 101, // Default to first mock user (dmytro_kh)
            text,
            timestamp: new Date().toISOString(),
        };

        setComments(prev => ({
            ...prev,
            [courseId]: [...(prev[courseId] || []), newComment],
        }));
        setCommentInputs(prev => ({ ...prev, [courseId]: '' }));
    };

    const handleProfileClick = (e, userId) => {
        e.stopPropagation();
        setProfilePopup(profilePopup === userId ? null : userId);
    };

    const filtered = mockCatalog.filter(course => {
        const matchSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.toLowerCase().includes(search.toLowerCase());
        const matchDept = filterDept === 'all' || course.department === filterDept;
        const matchType = filterType === 'all' || course.category === filterType;
        return matchSearch && matchDept && matchType;
    });

    const profileUser = profilePopup ? getUserById(profilePopup) : null;

    return (
        <div className="catalog-view animate-in">
            {/* Profile Popup Modal */}
            {profileUser && (
                <div className="profile-popup-overlay" onClick={() => setProfilePopup(null)}>
                    <div
                        className="profile-popup glass-panel"
                        ref={popupRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="profile-popup-close" onClick={() => setProfilePopup(null)}>
                            <X size={18} />
                        </button>
                        <div className="profile-popup-header">
                            <div
                                className="profile-popup-avatar"
                                style={{ background: profileUser.avatarColor }}
                            >
                                <User size={28} />
                            </div>
                            <div className="profile-popup-name">
                                <h3>{profileUser.first_name} {profileUser.last_name}</h3>
                                <span className="profile-popup-nickname">@{profileUser.nickname}</span>
                            </div>
                        </div>
                        <div className="profile-popup-details">
                            <div className="profile-popup-detail">
                                <GraduationCap size={15} />
                                <span>{profileUser.major}</span>
                            </div>
                            <div className="profile-popup-detail">
                                <Calendar size={15} />
                                <span>{profileUser.current_year}-й курс</span>
                            </div>
                            <div className="profile-popup-detail">
                                <Mail size={15} />
                                <span>{profileUser.nickname}@kse.org.ua</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="catalog-header">
                <div>
                    <h1 className="heading-1">Каталог курсів</h1>
                    <p className="text-muted">Весняний семестр 2027 · {mockCatalog.length} курсів доступно</p>
                </div>
            </div>

            {/* Filters */}
            <div className="catalog-filters">
                <div className="catalog-search glass-panel">
                    <Search size={18} className="text-muted" />
                    <input
                        type="text"
                        placeholder="Пошук за назвою, кодом або викладачем..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="catalog-search-input"
                    />
                </div>

                <div className="filter-chips">
                    <button
                        className={`filter-chip ${filterType === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterType('all')}
                    >
                        Всі
                    </button>
                    <button
                        className={`filter-chip ${filterType === 'core' ? 'active' : ''}`}
                        onClick={() => setFilterType('core')}
                    >
                        Обов'язкові
                    </button>
                    <button
                        className={`filter-chip ${filterType === 'elective' ? 'active' : ''}`}
                        onClick={() => setFilterType('elective')}
                    >
                        Вибіркові
                    </button>

                    <select
                        className="dept-select glass-panel"
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                    >
                        <option value="all">Всі кафедри</option>
                        {departments.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Course List */}
            <div className="catalog-grid">
                {filtered.map(course => {
                    const spotsLeft = course.spots.total - course.spots.taken;
                    const isFull = spotsLeft <= 0;
                    const isExpanded = expanded === course.id;
                    const isWishlisted = wishlist.has(course.id);
                    const isLoading = loadingWishlist.has(course.id);
                    const isElective = course.category === 'elective';
                    const courseComments = comments[course.id] || [];

                    return (
                        <div
                            key={course.id}
                            className={`catalog-card glass-panel ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => setExpanded(isExpanded ? null : course.id)}
                        >
                            <div className="catalog-card-main">
                                <div className="catalog-card-left">
                                    <div className="catalog-card-top">
                                        <span className={`course-type-badge ${course.category}`}>
                                            {course.category === 'core' ? "Обов'язковий" : 'Вибірковий'}
                                        </span>
                                        <span className="course-code-badge">{course.code}</span>
                                        <span className={`instructor-title-badge ${course.instructorTitle}`}>
                                            {course.instructorTitle === 'professor' ? '🎓 Професор' : '📖 Викладач'}
                                        </span>
                                    </div>
                                    <h3 className="catalog-course-name">{course.name}</h3>
                                    <p className="catalog-instructor">{course.instructor}</p>
                                </div>

                                <div className="catalog-card-right">
                                    <div className="catalog-meta">
                                        <span className="catalog-meta-item">
                                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                            {course.rating}
                                        </span>
                                        <span className="catalog-meta-item">
                                            <BookOpen size={14} />
                                            {course.credits} ECTS
                                        </span>
                                        <span className={`catalog-meta-item ${isFull ? 'full' : ''}`}>
                                            <Users size={14} />
                                            {isFull ? 'Заповнено' : `${spotsLeft} місць`}
                                        </span>
                                        {isElective && courseComments.length > 0 && (
                                            <span className="catalog-meta-item comment-count-badge">
                                                <MessageCircle size={14} />
                                                {courseComments.length}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown size={16} className={`expand-icon ${isExpanded ? 'rotated' : ''}`} />
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="catalog-card-details">
                                    <p className="catalog-description">{course.description}</p>

                                    <div className="catalog-details-grid">
                                        <div className="detail-item">
                                            <Clock size={14} />
                                            <span>{course.schedule}</span>
                                        </div>
                                        <div className="detail-item">
                                            <BookOpen size={14} />
                                            <span>{course.department}</span>
                                        </div>
                                        {course.prerequisites.length > 0 && (
                                            <div className="detail-item">
                                                <Lock size={14} />
                                                <span>Пререквізити: {course.prerequisites.join(', ')}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className={`btn-primary mt-sm ${isFull ? 'btn-disabled' : ''} ${isWishlisted ? 'btn-wishlisted' : ''}`}
                                        disabled={isFull || isLoading}
                                        onClick={(e) => handleWishlistToggle(e, course)}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={16} className="spin-icon" />
                                                Зачекайте...
                                            </>
                                        ) : isFull ? (
                                            'Немає місць'
                                        ) : isWishlisted ? (
                                            <>
                                                <Heart size={16} fill="currentColor" />
                                                Видалити зі списку
                                            </>
                                        ) : (
                                            <>
                                                <Heart size={16} />
                                                Додати до списку
                                            </>
                                        )}
                                    </button>

                                    {/* Instagram-style Comments — only for elective courses */}
                                    {isElective && (
                                        <div className="course-comments-section" onClick={(e) => e.stopPropagation()}>
                                            <div className="comments-header">
                                                <MessageCircle size={16} />
                                                <span>Коментарі студентів</span>
                                                <span className="comments-count">{courseComments.length}</span>
                                            </div>

                                            {courseComments.length > 0 && (
                                                <div className="comments-list">
                                                    {courseComments.map(comment => {
                                                        const commenter = getUserById(comment.userId);
                                                        if (!commenter) return null;
                                                        return (
                                                            <div key={comment.id} className="comment-item">
                                                                <div
                                                                    className="comment-avatar"
                                                                    style={{ background: commenter.avatarColor }}
                                                                    onClick={(e) => handleProfileClick(e, commenter.id)}
                                                                >
                                                                    <User size={14} />
                                                                </div>
                                                                <div className="comment-body">
                                                                    <div className="comment-top">
                                                                        <span
                                                                            className="comment-nickname"
                                                                            onClick={(e) => handleProfileClick(e, commenter.id)}
                                                                        >
                                                                            @{commenter.nickname}
                                                                        </span>
                                                                        <span className="comment-time">
                                                                            {formatTimeAgo(comment.timestamp)}
                                                                        </span>
                                                                    </div>
                                                                    <p className="comment-text">{comment.text}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Comment Input */}
                                            <form
                                                className="comment-input-row"
                                                onSubmit={(e) => handleCommentSubmit(e, course.id)}
                                            >
                                                <div className="comment-input-avatar" style={{ background: '#2563EB' }}>
                                                    <User size={12} />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="comment-input"
                                                    placeholder="Додати коментар..."
                                                    value={commentInputs[course.id] || ''}
                                                    onChange={(e) => setCommentInputs(prev => ({
                                                        ...prev,
                                                        [course.id]: e.target.value,
                                                    }))}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <button
                                                    type="submit"
                                                    className="comment-send-btn"
                                                    disabled={!(commentInputs[course.id] || '').trim()}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Send size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="catalog-empty">
                        <Search size={48} className="text-muted" />
                        <p>Курсів за вашим запитом не знайдено</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCatalog;
