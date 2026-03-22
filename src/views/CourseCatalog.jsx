import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Clock, Users, Star, Search, ChevronDown, Lock, Heart, Loader2, MessageCircle, Send, X, User, GraduationCap, Calendar, Mail, ArrowDown, ArrowUp, Filter } from 'lucide-react';
import { mockCatalog, mockComments, mockUsers } from '../data/mockData';
import { fetchWithAuth } from '../utils/api';

const MultiRangeSlider = ({ min, max, value, onChange }) => {
    const handleMinChange = (e) => {
        const val = Math.min(Number(e.target.value), value[1] - 1);
        onChange([val, value[1]]);
    };
    const handleMaxChange = (e) => {
        const val = Math.max(Number(e.target.value), value[0] + 1);
        onChange([value[0], val]);
    };

    const leftPercent = ((value[0] - min) / (max - min)) * 100;
    const rightPercent = 100 - ((value[1] - min) / (max - min)) * 100;

    return (
        <div className="multi-range-slider-container">
            <input 
                type="range" 
                min={min} max={max} 
                value={value[0]} 
                onChange={handleMinChange} 
                className="thumb thumb-left" 
            />
            <input 
                type="range" 
                min={min} max={max} 
                value={value[1]} 
                onChange={handleMaxChange} 
                className="thumb thumb-right" 
            />
            <div className="slider-track">
                <div 
                    className="slider-range" 
                    style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }} 
                />
            </div>
            <div className="slider-values mt-xs">
                <span>{value[0]}</span>
                <span>{value[1]}</span>
            </div>
        </div>
    );
};

const minCredits = Math.min(...mockCatalog.map(c => c.credits));
const maxCredits = Math.max(...mockCatalog.map(c => c.credits));
const minDuration = Math.min(...mockCatalog.map(c => c.duration));
const maxDuration = Math.max(...mockCatalog.map(c => c.duration));

const defaultFilters = {
    dept: [],
    level: [],
    term: [],
    nextTerm: false,
    language: [],
    credits: [minCredits, maxCredits],
    duration: [minDuration, maxDuration]
};

const CourseCatalog = ({ user }) => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    
    // Abstracting filters into active and pending states
    const [activeFilters, setActiveFilters] = useState(defaultFilters);
    const [pendingFilters, setPendingFilters] = useState(defaultFilters);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [sortField, setSortField] = useState('rating');
    const [sortOrder, setSortOrder] = useState('desc');
    const [expanded, setExpanded] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());
    const [loadingWishlist, setLoadingWishlist] = useState(new Set());
    
    const [comments, setComments] = useState(() => {
        const initial = {};
        for (const [courseId, cmts] of Object.entries(mockComments)) {
            initial[courseId] = [...cmts];
        }
        return initial;
    });
    const [commentInputs, setCommentInputs] = useState({});
    const [profilePopup, setProfilePopup] = useState(null); 
    const popupRef = useRef(null);
    const sidebarRef = useRef(null);

    const departments = [...new Set(mockCatalog.map(c => c.department))];

    const getUserById = (userId) => mockUsers.find(u => u.id === userId);

    const formatTimeAgo = (timestamp) => {
        const now = new Date('2027-01-20T12:00:00Z'); 
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

    useEffect(() => {
        const handleClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setProfilePopup(null);
            }
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.closest('.filter-toggle-btn')) {
                // Clicking outside the sidebar closes it without saving
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isSidebarOpen]);

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
            userId: 101, 
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

    // Filter Handlers
    const openSidebar = () => {
        setPendingFilters(activeFilters);
        setIsSidebarOpen(true);
    };

    const saveFilters = () => {
        setActiveFilters(pendingFilters);
        setIsSidebarOpen(false);
    };

    const clearFilters = () => {
        setPendingFilters(defaultFilters);
    };

    const updatePending = (key, value) => {
        setPendingFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleCheckboxArray = (key, val, checked) => {
        const arr = pendingFilters[key];
        if (checked) {
            updatePending(key, [...arr, val]);
        } else {
            updatePending(key, arr.filter(x => x !== val));
        }
    };

    const isFiltersActive = JSON.stringify(activeFilters) !== JSON.stringify(defaultFilters);

    const filtered = mockCatalog.filter(course => {
        const matchSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.toLowerCase().includes(search.toLowerCase());
        const matchDept = activeFilters.dept.length === 0 || activeFilters.dept.includes(course.department);
        const matchType = filterType === 'all' || course.category === filterType;
        const matchLevel = activeFilters.level.length === 0 || activeFilters.level.includes(course.level);
        const matchTerm = activeFilters.term.length === 0 || activeFilters.term.includes(course.term);
        const matchLang = activeFilters.language.length === 0 || activeFilters.language.includes(course.language);
        const matchNextTerm = !activeFilters.nextTerm || course.next_term;
        const matchCredits = course.credits >= activeFilters.credits[0] && course.credits <= activeFilters.credits[1];
        const matchDuration = course.duration >= activeFilters.duration[0] && course.duration <= activeFilters.duration[1];

        return matchSearch && matchDept && matchType && matchLevel && matchTerm && matchLang && matchNextTerm && matchCredits && matchDuration;
    });

    const sorted = [...filtered].sort((a, b) => {
        let valA, valB;
        if (sortField === 'rating') { valA = a.rating; valB = b.rating; }
        else if (sortField === 'credits') { valA = a.credits; valB = b.credits; }
        else if (sortField === 'duration') { valA = a.duration; valB = b.duration; }
        else if (sortField === 'dept') {
            const cmp = a.department.localeCompare(b.department);
            return sortOrder === 'asc' ? cmp : -cmp;
        }

        if (sortField !== 'dept') {
            return sortOrder === 'desc' ? valB - valA : valA - valB;
        }
        return 0;
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

            <div className="catalog-layout">
                {/* Advanced Filters Overlay / Sidebar Conditionally rendered */}
                {isSidebarOpen && (
                    <aside className="catalog-sidebar glass-panel modal-like-sidebar" ref={sidebarRef}>
                        <div className="sidebar-header">
                            <h3 className="heading-3" style={{ fontSize: '1.2rem', margin: 0 }}>Фільтри</h3>
                            <button className="profile-popup-close" onClick={() => setIsSidebarOpen(false)} style={{ position: 'static' }}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="sidebar-content">
                            <div className="filter-group">
                                <h4>Кафедра / Спеціалізація</h4>
                                {departments.map(d => (
                                    <label className="checkbox-label" key={d}>
                                        <input type="checkbox" checked={pendingFilters.dept.includes(d)} onChange={(e) => handleCheckboxArray('dept', d, e.target.checked)} /> {d}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>Рівень</h4>
                                {['Бакалавр', 'Магістр', 'PhD'].map(lvl => (
                                    <label className="checkbox-label" key={lvl}>
                                        <input type="checkbox" checked={pendingFilters.level.includes(lvl)} onChange={(e) => handleCheckboxArray('level', lvl, e.target.checked)} /> {lvl}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>Терм</h4>
                                {['Осінь', 'Весна', 'Літо'].map(t => (
                                    <label className="checkbox-label" key={t}>
                                        <input type="checkbox" checked={pendingFilters.term.includes(t)} onChange={(e) => handleCheckboxArray('term', t, e.target.checked)} /> {t}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>Доступність</h4>
                                <label className="checkbox-label">
                                    <input type="checkbox" checked={pendingFilters.nextTerm} onChange={(e) => updatePending('nextTerm', e.target.checked)} />
                                    Тільки наступного терму
                                </label>
                            </div>

                            <div className="filter-group">
                                <h4>Мова викладання</h4>
                                {['Українська', 'Англійська'].map(lang => (
                                    <label className="checkbox-label" key={lang}>
                                        <input type="checkbox" checked={pendingFilters.language.includes(lang)} onChange={(e) => handleCheckboxArray('language', lang, e.target.checked)} /> {lang}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>Кредити ECTS</h4>
                                <MultiRangeSlider 
                                    min={minCredits} max={maxCredits} 
                                    value={pendingFilters.credits} 
                                    onChange={(arr) => updatePending('credits', arr)} 
                                />
                            </div>

                            <div className="filter-group" style={{ marginTop: '0.5rem' }}>
                                <h4>Тривалість (тижнів)</h4>
                                <MultiRangeSlider 
                                    min={minDuration} max={maxDuration} 
                                    value={pendingFilters.duration} 
                                    onChange={(arr) => updatePending('duration', arr)} 
                                />
                            </div>
                        </div>

                        <div className="sidebar-footer" style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                            <button className="btn-secondary" style={{ flex: 1, padding: '0.5rem' }} onClick={clearFilters}>Очистити</button>
                            <button className="btn-primary" style={{ flex: 1, padding: '0.5rem' }} onClick={saveFilters}>Зберегти</button>
                        </div>
                    </aside>
                )}

                <div className="catalog-main" style={{ gridColumn: isSidebarOpen ? '2' : '1 / -1' }}>
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
                            
                            <button 
                                className={`dept-select glass-panel filter-toggle-btn ${isFiltersActive ? 'active' : ''}`} 
                                onClick={openSidebar}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: "0.5rem" }}
                            >
                                <Filter size={14} />
                                Фільтри
                                {isFiltersActive && (
                                    <span style={{ width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%' }}></span>
                                )}
                            </button>

                            <div className="sort-controls" style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                                <select
                                    className="dept-select glass-panel"
                                    value={sortField}
                                    onChange={(e) => setSortField(e.target.value)}
                                >
                                    <option value="rating">За рейтингом</option>
                                    <option value="credits">За кредитами</option>
                                    <option value="duration">За тривалістю</option>
                                    <option value="dept">За спеціалізацією</option>
                                </select>
                                <button 
                                    className="dept-select glass-panel sort-order-btn" 
                                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                                    title={sortOrder === 'desc' ? 'За спаданням' : 'За зростанням'}
                                >
                                    {sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="catalog-grid">
                        {sorted.map(course => {
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
                                                <span className="catalog-meta-item">
                                                    <Clock size={14} />
                                                    {course.duration} тиж.
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

                        {sorted.length === 0 && (
                            <div className="catalog-empty">
                                <Search size={48} className="text-muted" />
                                <p>Курсів за вашим запитом не знайдено</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCatalog;
