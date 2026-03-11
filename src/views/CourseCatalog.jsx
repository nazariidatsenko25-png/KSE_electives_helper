import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Users, Star, Search, Filter, ChevronDown, Lock, Heart, Loader2 } from 'lucide-react';
import { mockCatalog } from '../data/mockData';
import { fetchWithAuth } from '../utils/api';

const CourseCatalog = ({ user }) => {
    const [search, setSearch] = useState('');
    const [filterDept, setFilterDept] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [expanded, setExpanded] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());
    const [loadingWishlist, setLoadingWishlist] = useState(new Set());

    const departments = [...new Set(mockCatalog.map(c => c.department))];

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

        // Mark this card as loading
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

    const filtered = mockCatalog.filter(course => {
        const matchSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.toLowerCase().includes(search.toLowerCase());
        const matchDept = filterDept === 'all' || course.department === filterDept;
        const matchType = filterType === 'all' || course.category === filterType;
        return matchSearch && matchDept && matchType;
    });

    return (
        <div className="catalog-view animate-in">
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
