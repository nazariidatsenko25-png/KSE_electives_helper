import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, Star, BookOpen, MessageCircle, BarChart2, Award, ChevronDown, ChevronUp, Lock, Sparkles, Filter, ArrowDown, ArrowUp, Pin, PinOff, CheckCircle, GraduationCap, Clock, Activity, FileText, Bot, X, Loader2, Send, ThumbsUp, ThumbsDown, Calendar, User, GitCompareArrows } from 'lucide-react';
import { mockCatalog, mockComments, mockUsers, mockReviews, mockEnrollments, mockTranscript, mockPreviousGeneration } from '../data/mockData';
import { useApp } from '../context/AppContext';
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

const CourseCatalog = ({ user, navigate }) => {
    const { t } = useApp();
    const c = t.catalog;
    
    const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
    const [filterType, setFilterType] = useState(() => new URLSearchParams(window.location.search).get('filterType') || 'all');
    const [pinActive, setPinActive] = useState(true);
    
    // Abstracting filters into active and pending states
    const [activeFilters, setActiveFilters] = useState(defaultFilters);
    const [pendingFilters, setPendingFilters] = useState(defaultFilters);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarMaxHeight, setSidebarMaxHeight] = useState(null);

    const [sortField, setSortField] = useState('term');
    const [sortOrder, setSortOrder] = useState('asc'); // change to asc for default term progression
    const [expanded, setExpanded] = useState(() => {
        const exp = new URLSearchParams(window.location.search).get('expanded');
        return exp ? Number(exp) : null;
    });
    const [showFullInfoFor, setShowFullInfoFor] = useState(null);

    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setSearch(params.get('q') || '');
            setFilterType(params.get('filterType') || 'all');
            const exp = params.get('expanded');
            setExpanded(exp ? Number(exp) : null);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const prevExpandedRef = useRef(expanded);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let changed = false;
        let isNavigation = false;

        if (expanded !== prevExpandedRef.current) {
            isNavigation = true;
            prevExpandedRef.current = expanded;
        }

        const newExp = expanded ? String(expanded) : null;
        if (params.get('expanded') !== newExp) {
            if (newExp) params.set('expanded', newExp);
            else params.delete('expanded');
            changed = true;
        }

        const newQ = search || null;
        if (params.get('q') !== (newQ || null)) { // strict check isn't strictly necessary but safe
            if (newQ) params.set('q', newQ);
            else params.delete('q');
            changed = true;
        }

        const newFlt = filterType !== 'all' ? filterType : null;
        if (params.get('filterType') !== newFlt) {
            if (newFlt) params.set('filterType', newFlt);
            else params.delete('filterType');
            changed = true;
        }

        if (changed) {
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            // Avoid pushing state loop if URL already matches
            if (window.location.search !== `?${params.toString()}`) {
                if (isNavigation) {
                    const container = document.querySelector('.view-container');
                    const currentScroll = container ? container.scrollTop : 0;
                    window.history.replaceState({ ...window.history.state, scrollTop: currentScroll }, '');
                    window.history.pushState({ scrollTop: 0 }, '', newUrl);
                } else {
                    window.history.replaceState(window.history.state, '', newUrl);
                }
            }
        }
    }, [expanded, search, filterType]);
    const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);
    const [showExtendedStats, setShowExtendedStats] = useState(false);
    const [wishlist, setWishlist] = useState(new Set());
    const [loadingWishlist, setLoadingWishlist] = useState(new Set());
    
    // Per-review comments state
    const [reviewComments, setReviewComments] = useState({}); // { reviewId: [comment] }
    const [reviewCommentInputs, setReviewCommentInputs] = useState({}); // { reviewId: '' }
    const [expandedReviewComments, setExpandedReviewComments] = useState({}); // { reviewId: bool }


    // Reviews state
    const [reviews, setReviews] = useState(() => {
        const init = {};
        for (const [courseId, revs] of Object.entries(mockReviews)) {
            init[courseId] = revs.map(r => ({ ...r }));
        }
        return init;
    });
    const [reviewVotes, setReviewVotes] = useState({}); // { reviewId: 'like' | 'dislike' | null }
    const [aiSummaryState, setAiSummaryState] = useState({}); // { courseId: { loading, summary } }
    const [reviewsExpanded, setReviewsExpanded] = useState({}); 
    const [changesMode, setChangesMode] = useState({}); // { courseId: boolean }
    const popupRef = useRef(null);
    const sidebarRef = useRef(null);

    // Dynamically compute max-height for the filter panel so it always fits in the viewport
    useEffect(() => {
        if (!isSidebarOpen) return;
        const computeHeight = () => {
            if (sidebarRef.current) {
                const rect = sidebarRef.current.getBoundingClientRect();
                setSidebarMaxHeight(window.innerHeight - rect.top - 16);
            }
        };
        // Run after paint so the element is in its final position
        const raf = requestAnimationFrame(computeHeight);
        window.addEventListener('resize', computeHeight);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', computeHeight);
        };
    }, [isSidebarOpen]);

    const departments = [...new Set(mockCatalog.map(c => c.department))];

    const getUserById = (userId) => mockUsers.find(u => u.id === userId);

    const getCourseDates = (semester, startWeek, duration) => {
        let term = 'Spring';
        let year = 2027;
        if (semester) {
            if (semester.includes('Осінь')) term = 'Autumn';
            else if (semester.includes('Літо')) term = 'Summer';
            const yMatch = semester.match(/\d{4}/);
            if (yMatch) year = parseInt(yMatch[0]);
        }
        
        let termStartStr = `${year}-02-01`; // Default Spring
        if (term === 'Autumn') termStartStr = `${year}-09-01`;
        else if (term === 'Summer') termStartStr = `${year}-07-01`;
        
        const start = new Date(termStartStr);
        start.setDate(start.getDate() + (startWeek - 1) * 7);
        
        const end = new Date(start);
        end.setDate(end.getDate() + (duration * 7) - 1);
        
        const formatter = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return { start: formatter.format(start), end: formatter.format(end) };
    };

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
                // popup closed
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
                .catch(err => {
                    console.warn('Wishlist fetch unavailable, falling back to local storage:', err.message);
                    const storageKey = `mock_wishlist_${user.id}`;
                    const saved = localStorage.getItem(storageKey);
                    if (saved) {
                        setWishlist(new Set(JSON.parse(saved)));
                    } else if (user.wishlist) {
                        setWishlist(new Set(user.wishlist));
                        localStorage.setItem(storageKey, JSON.stringify(user.wishlist));
                    }
                });
        } else {
            setWishlist(new Set());
        }
    }, [user]);

    const handleWishlistToggle = async (e, course) => {
        e.stopPropagation();
        if (!user) return; // Prevent toggling if unexpected guest
        const courseId = course.id;
        const isWishlisted = wishlist.has(courseId);

        setLoadingWishlist(prev => new Set(prev).add(courseId));

        const updateLocalAndState = (newSet) => {
            setWishlist(newSet);
            localStorage.setItem(`mock_wishlist_${user.id}`, JSON.stringify([...newSet]));
            return newSet;
        };

        try {
            if (isWishlisted) {
                // Optimistic UI + LocalStorage update
                setWishlist(prev => {
                    const next = new Set(prev);
                    next.delete(courseId);
                    return updateLocalAndState(next);
                });
                await fetchWithAuth(`/api/wishlist/${courseId}/`, {
                    method: 'DELETE',
                    suppressAuthRedirect: true,
                }).catch(() => {});
            } else {
                setWishlist(prev => {
                    const next = new Set(prev);
                    next.add(courseId);
                    return updateLocalAndState(next);
                });
                await fetchWithAuth('/api/wishlist/', {
                    method: 'POST',
                    suppressAuthRedirect: true,
                    body: JSON.stringify({ course: courseId }),
                }).catch(() => {});
            }
        } finally {
            setLoadingWishlist(prev => {
                const next = new Set(prev);
                next.delete(courseId);
                return next;
            });
        }
    };

    const handleReviewCommentSubmit = (e, reviewId) => {
        e.preventDefault();
        e.stopPropagation();
        const text = (reviewCommentInputs[reviewId] || '').trim();
        if (!text) return;
        const newComment = {
            id: Date.now(),
            userId: user?.id ?? 1,
            text,
            timestamp: new Date().toISOString(),
        };
        setReviewComments(prev => ({
            ...prev,
            [reviewId]: [...(prev[reviewId] || []), newComment],
        }));
        setReviewCommentInputs(prev => ({ ...prev, [reviewId]: '' }));
    };

    const handleProfileClick = (e, userId) => {
        e.stopPropagation();
        if (navigate) navigate('student-profile', { userId });
    };

    const handleInstructorClick = (e, course) => {
        e.stopPropagation();
        if (navigate) navigate('instructor-profile', { courseId: course.id });
    };

    const handleReviewVote = (e, reviewId, vote) => {
        e.stopPropagation();
        const current = reviewVotes[reviewId];
        const next = current === vote ? null : vote;
        setReviewVotes(prev => ({ ...prev, [reviewId]: next }));
        setReviews(prev => {
            const updated = {};
            for (const [cid, revList] of Object.entries(prev)) {
                updated[cid] = revList.map(r => {
                    if (r.id !== reviewId) return r;
                    let likes = r.likes;
                    let dislikes = r.dislikes;
                    if (current === 'like') likes--;
                    else if (current === 'dislike') dislikes--;
                    if (next === 'like') likes++;
                    else if (next === 'dislike') dislikes++;
                    return { ...r, likes, dislikes };
                });
            }
            return updated;
        });
    };

    const handleAiSummarize = async (e, courseId) => {
        e.stopPropagation();
        const courseRevs = reviews[courseId] || [];
        if (courseRevs.length === 0) return;
        setAiSummaryState(prev => ({ ...prev, [courseId]: { loading: true, summary: null } }));
        // Collect all questions (use first review as template)
        const questions = courseRevs[0]?.questions.map(q => q.q) || [];
        // Build a simulated AI summary by aggregating answers
        await new Promise(r => setTimeout(r, 1200));
        const summaryByQuestion = questions.map((question, qi) => {
            const answers = courseRevs.map(r => r.questions[qi]?.a).filter(Boolean);
            // Combine answers into a coherent summary sentence
            const combined = answers.length === 1
                ? answers[0]
                : `${answers[0]} Інші студенти також відзначають: ${answers.slice(1).join(' ')}` ;
            return { q: question, a: combined };
        });
        setAiSummaryState(prev => ({ ...prev, [courseId]: { loading: false, summary: summaryByQuestion } }));
    };

    const formatReviewDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('uk-UA', { day: '2-digit', month: 'short', year: 'numeric' });
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

    // ── "Show Changes" helpers ──
    const getChanges = (courseId) => {
        const prev = mockPreviousGeneration[courseId];
        if (!prev) return null;
        const current = mockCatalog.find(cc => cc.id === courseId);
        if (!current) return null;

        const numericFields = [
            { key: 'credits', label: 'ECTS' },
            { key: 'lectureHours', label: 'Лекції (год)' },
            { key: 'practiceHours', label: 'Практика (год)' },
            { key: 'selfStudyHours', label: 'Самост. (год)' },
        ];

        const numericDiffs = [];
        for (const f of numericFields) {
            if (prev[f.key] !== undefined && prev[f.key] !== current[f.key]) {
                const delta = current[f.key] - prev[f.key];
                numericDiffs.push({
                    key: f.key,
                    label: f.label,
                    oldVal: prev[f.key],
                    newVal: current[f.key],
                    delta,
                    direction: delta > 0 ? 'up' : 'down',
                });
            }
        }

        const textDiffs = [];
        if (prev.description && prev.description !== current.description) {
            textDiffs.push({ key: 'description', label: 'Опис', oldText: prev.description, newText: current.description });
        }
        if (prev.instructor && prev.instructor !== current.instructor) {
            textDiffs.push({ key: 'instructor', label: 'Викладач', oldText: prev.instructor, newText: current.instructor });
        }

        // Syllabus text diffs
        if (prev.detailedSyllabus && current.detailedSyllabus) {
            const ps = prev.detailedSyllabus;
            const cs = current.detailedSyllabus;
            if (ps.justification && ps.justification !== cs.justification) {
                textDiffs.push({ key: 'justification', label: 'Обґрунтування', oldText: ps.justification, newText: cs.justification });
            }
            if (ps.goals && JSON.stringify(ps.goals) !== JSON.stringify(cs.goals)) {
                textDiffs.push({ key: 'goals', label: 'Цілі курсу', oldText: ps.goals.join('; '), newText: cs.goals.join('; ') });
            }
            if (ps.outcomes && JSON.stringify(ps.outcomes) !== JSON.stringify(cs.outcomes)) {
                textDiffs.push({ key: 'outcomes', label: 'Результати навчання', oldText: ps.outcomes.join('; '), newText: cs.outcomes.join('; ') });
            }
        }

        // Grading breakdown diffs
        const gradingDiffs = [];
        if (prev.gradingBreakdown && current.gradingBreakdown) {
            for (const gk of ['exam', 'project', 'homework']) {
                const ov = prev.gradingBreakdown[gk];
                const nv = current.gradingBreakdown[gk];
                if (ov !== undefined && ov !== nv) {
                    const labels = { exam: 'Іспит', project: 'Проєкт', homework: 'ДЗ' };
                    gradingDiffs.push({ key: gk, label: labels[gk], oldVal: ov, newVal: nv, delta: nv - ov, direction: nv > ov ? 'up' : 'down' });
                }
            }
        }

        const totalChanges = numericDiffs.length + textDiffs.length + gradingDiffs.length;
        return { numericDiffs, textDiffs, gradingDiffs, hasChanges: totalChanges > 0, totalChanges };
    };

    const renderNumericChange = (diff) => (
        <span className="change-indicator" key={diff.key}>
            <span className={`change-arrow ${diff.direction}`}>
                {diff.direction === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            </span>
            <span className={`change-magnitude ${diff.direction}`}>
                {diff.direction === 'up' ? '+' : ''}{Math.round(diff.delta * 10) / 10}
            </span>
        </span>
    );

    const renderTextChange = (diff) => (
        <div className="text-diff-container" key={diff.key}>
            <div className="text-diff-label">{diff.label}:</div>
            <div className="text-diff-old">
                <span className="text-diff-tag">{c.changes.was}</span>
                {diff.oldText}
            </div>
            <div className="text-diff-new">
                <span className="text-diff-tag">{c.changes.now}</span>
                {diff.newText}
            </div>
        </div>
    );

    const getNumericDiff = (changes, fieldKey) => {
        if (!changes) return null;
        return changes.numericDiffs.find(d => d.key === fieldKey);
    };

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
        const matchWishlist = !showOnlyWishlist || wishlist.has(course.id);

        return matchSearch && matchDept && matchType && matchLevel && matchTerm && matchLang && matchNextTerm && matchCredits && matchDuration && matchWishlist;
    });

    const getSemesterRank = (semesterStr) => {
        if (!semesterStr) return 1000;
        const currentYear = 2027;
        const currentTermVal = 2; // Весна=2
        const parts = semesterStr.split(' ');
        const term = parts[0];
        const year = parseInt(parts[1], 10) || 0;
        const termOrder = { [c.terms.autumn]: 1, [c.terms.spring]: 2, [c.terms.summer]: 3 };
        const termVal = termOrder[term] || 0;
        
        const diff = (year - currentYear) * 4 + (termVal - currentTermVal);
        if (diff < 0) return 1000 - diff; // Past courses at the very bottom
        return diff; // Present=0, Future=1, 2...
    };

    const sorted = [...filtered].sort((a, b) => {
        let valA, valB;
        if (sortField === 'rating') { valA = a.rating; valB = b.rating; }
        else if (sortField === 'credits') { valA = a.credits; valB = b.credits; }
        else if (sortField === 'duration') { valA = a.duration; valB = b.duration; }
        else if (sortField === 'passRate') { valA = a.passRate60Plus || 0; valB = b.passRate60Plus || 0; }
        else if (sortField === 'avgScore') { valA = a.historicalAverage || 0; valB = b.historicalAverage || 0; }
        else if (sortField === 'term') { valA = getSemesterRank(a.semester); valB = getSemesterRank(b.semester); }
        else if (sortField === 'dept') {
            const cmp = a.department.localeCompare(b.department);
            return sortOrder === 'asc' ? cmp : -cmp;
        }

        if (sortField !== 'dept') {
            return sortOrder === 'desc' ? valB - valA : valA - valB;
        }
        return 0;
    });


    return (
        <div className="catalog-view animate-in">

            <div className="catalog-header">
                <div>
                    <h1 className="heading-1">{c.title}</h1>
                    <p className="text-muted">{c.subtitle.replace('{count}', mockCatalog.length)}</p>
                </div>
            </div>

            <div className="catalog-layout">
                {/* Advanced Filters Overlay / Sidebar Conditionally rendered */}
                {isSidebarOpen && (
                    <aside className="catalog-sidebar glass-panel modal-like-sidebar" ref={sidebarRef}
                        style={sidebarMaxHeight ? { maxHeight: `${sidebarMaxHeight}px` } : undefined}>
                        <div className="sidebar-header">
                            <h3 className="heading-3" style={{ fontSize: '1.2rem', margin: 0 }}>{c.filters}</h3>
                            <button className="profile-popup-close" onClick={() => setIsSidebarOpen(false)} style={{ position: 'static' }}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="sidebar-content">
                            <div className="filter-group">
                                <h4>{c.department}</h4>
                                {departments.map(d => (
                                    <label className="checkbox-label" key={d}>
                                        <input type="checkbox" checked={pendingFilters.dept.includes(d)} onChange={(e) => handleCheckboxArray('dept', d, e.target.checked)} /> {d}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>{c.level}</h4>
                                {[c.levels.bachelor, c.levels.master, c.levels.phd].map(lvl => (
                                    <label className="checkbox-label" key={lvl}>
                                        <input type="checkbox" checked={pendingFilters.level.includes(lvl)} onChange={(e) => handleCheckboxArray('level', lvl, e.target.checked)} /> {lvl}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>{c.term}</h4>
                                {[c.terms.autumn, c.terms.spring, c.terms.summer].map(t => (
                                    <label className="checkbox-label" key={t}>
                                        <input type="checkbox" checked={pendingFilters.term.includes(t)} onChange={(e) => handleCheckboxArray('term', t, e.target.checked)} /> {t}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-group">
                                <h4>{c.availability}</h4>
                                <label className="checkbox-label">
                                    <input type="checkbox" checked={pendingFilters.nextTerm} onChange={(e) => updatePending('nextTerm', e.target.checked)} />
                                    {c.nextTermOnly}
                                </label>
                            </div>

                            <div className="filter-group">
                                <h4>{c.language}</h4>
                                {[c.languages.uk, c.languages.en].map(lang => (
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
                                <h4>{c.duration}</h4>
                                <MultiRangeSlider 
                                    min={minDuration} max={maxDuration} 
                                    value={pendingFilters.duration} 
                                    onChange={(arr) => updatePending('duration', arr)} 
                                />
                            </div>
                        </div>

                        <div className="sidebar-footer" style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="btn-secondary" style={{ flex: 1, padding: '0.5rem' }} onClick={clearFilters}>{c.clear}</button>
                            <button className="btn-primary" style={{ flex: 1, padding: '0.5rem' }} onClick={saveFilters}>{c.save}</button>
                        </div>
                    </aside>
                )}

                <div className={`catalog-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="catalog-filters">
                        <div className="catalog-search glass-panel">
                            <Search size={18} className="text-muted" />
                            <input
                                type="text"
                                placeholder={c.searchPlaceholder}
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
                                {c.filterAll}
                            </button>
                            <button
                                className={`filter-chip ${filterType === 'core' ? 'active' : ''}`}
                                onClick={() => setFilterType('core')}
                            >
                                {c.filterCore}
                            </button>
                            <button
                                className={`filter-chip ${filterType === 'elective' ? 'active' : ''}`}
                                onClick={() => setFilterType('elective')}
                            >
                                {c.filterElective}
                            </button>
                            
                            <button 
                                className={`dept-select glass-panel filter-toggle-btn ${showOnlyWishlist ? 'active' : ''}`} 
                                onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: "0.5rem", color: showOnlyWishlist ? '#ef4444' : 'inherit' }}
                            >
                                <Heart size={14} fill={showOnlyWishlist ? 'currentColor' : 'none'} color={showOnlyWishlist ? '#ef4444' : 'currentColor'} />
                                {c.wishlist}
                            </button>

                            <button 
                                className={`dept-select glass-panel filter-toggle-btn ${isFiltersActive ? 'active' : ''}`} 
                                onClick={openSidebar}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <Filter size={14} />
                                {c.filters}
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
                                    <option value="term">{c.sortOptions.term}</option>
                                    <option value="rating">{c.sortOptions.rating}</option>
                                    <option value="credits">{c.sortOptions.credits}</option>
                                    <option value="duration">{c.sortOptions.duration}</option>
                                    <option value="dept">{c.sortOptions.dept}</option>
                                    <option value="passRate">{c.sortOptions.passRate}</option>
                                    <option value="avgScore">{c.sortOptions.avgScore}</option>
                                </select>
                                <button 
                                    className="dept-select glass-panel sort-order-btn" 
                                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                                    title={sortOrder === 'desc' ? c.sortOrderDesc : c.sortOrderAsc}
                                >
                                    {sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                                </button>
                                <button
                                    className={`dept-select glass-panel sort-order-btn pin-toggle-btn ${pinActive ? 'pin-active' : ''}`}
                                    onClick={() => setPinActive(prev => !prev)}
                                    title={pinActive ? c.pinHide : c.pinShow}
                                >
                                    {pinActive ? <Pin size={16} /> : <PinOff size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="catalog-grid">
                        {(() => {
                            // Active courses — only available when logged in
                            const activeCourseIds = user
                                ? new Set(mockEnrollments[user.id] || [])
                                : new Set();

                            // Completed courses - matched through transcript
                            const completedCourseIds = user
                                ? new Set(sorted.filter(courseItem => mockTranscript?.some(trItem => trItem.course_code === courseItem.code)).map(courseItem => courseItem.id))
                                : new Set();

                            const pinnedCourses = (pinActive && user) ? sorted.filter(courseObj => activeCourseIds.has(courseObj.id)) : [];
                            const restCourses = (pinActive && user) ? sorted.filter(courseObj => !activeCourseIds.has(courseObj.id)) : sorted;

                            const renderCard = (course, isActive = false, isCompleted = false) => {
                            const isExpanded = expanded === course.id;
                            const isWishlisted = wishlist.has(course.id);
                            const isLoading = loadingWishlist.has(course.id);
                            const isElective = course.category === 'elective';
                            const courseReviews = reviews[course.id] || [];
                            const aiState = aiSummaryState[course.id] || {};
                            const isReviewsExpanded = reviewsExpanded[course.id] ?? false;
                            const isChangesActive = changesMode[course.id] || false;
                            const changes = isChangesActive ? getChanges(course.id) : null;
                            const hasPreviousGen = !!mockPreviousGeneration[course.id];

                            return (
                                <div
                                    key={course.id}
                                    className={`catalog-card glass-panel ${isExpanded ? 'expanded' : ''} ${isActive ? 'active-course' : ''} ${isCompleted ? 'completed-course' : ''}`}
                                    onClick={() => {
                                        setExpanded(isExpanded ? null : course.id);
                                        setShowExtendedStats(false);
                                        if (!isExpanded) setShowFullInfoFor(null);
                                    }}
                                >
                                    <div className="catalog-card-main">
                                        <div className="catalog-card-left">
                                            <div className="catalog-card-top" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span className={`course-type-badge ${course.category}`}>
                                                    {course.category === 'core' ? c.badges.core : c.badges.elective}
                                                </span>
                                                <span className="course-code-badge">{course.code}</span>

                                                {course.attendanceMandatory && (
                                                    <span className="attendance-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }} title={c.badges.mandatory}>
                                                        <Lock size={12} /> {c.badges.mandatory}
                                                    </span>
                                                )}
                                                {course.bonusPointsAvailable && (
                                                    <span className="bonus-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }} title={c.badges.bonuses}>
                                                        <Sparkles size={12} /> {c.badges.bonuses}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="catalog-course-name">{course.name}</h3>
                                            <p className="catalog-instructor">{course.instructor}</p>
                                        </div>

                                        <div className="catalog-card-right">
                                            <div className="catalog-meta">
                                                <span 
                                                    className="catalog-meta-item" 
                                                    style={{ color: isWishlisted ? '#ef4444' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} 
                                                    title={isWishlisted ? c.wishlistRemove : c.wishlistAdd}
                                                    onClick={(e) => handleWishlistToggle(e, course)}
                                                >
                                                    <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                                                </span>
                                                <span className="catalog-meta-item">
                                                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                                    {course.rating}
                                                    {isChangesActive && getNumericDiff(changes, 'rating') && renderNumericChange(getNumericDiff(changes, 'rating'))}
                                                </span>
                                                <span className="catalog-meta-item">
                                                    <BookOpen size={14} />
                                                    {course.credits} ECTS
                                                    {isChangesActive && getNumericDiff(changes, 'credits') && renderNumericChange(getNumericDiff(changes, 'credits'))}
                                                </span>
                                                <span className="catalog-meta-item">
                                                    <MessageCircle size={14} />
                                                    {course.language}
                                                </span>
                                                <span className="catalog-meta-item">
                                                    <BarChart2 size={14} color="#6EE7B7" />
                                                    {course.passRate60Plus || '--'}{c.passRate}
                                                    {isChangesActive && getNumericDiff(changes, 'passRate60Plus') && renderNumericChange(getNumericDiff(changes, 'passRate60Plus'))}
                                                </span>
                                                <span className="catalog-meta-item">
                                                    <Award size={14} color="#93C5FD" />
                                                    {c.avgScore} {course.historicalAverage || '--'}
                                                    {isChangesActive && getNumericDiff(changes, 'historicalAverage') && renderNumericChange(getNumericDiff(changes, 'historicalAverage'))}
                                                </span>
                                            </div>
                                            <ChevronDown size={16} className={`expand-icon ${isExpanded ? 'rotated' : ''}`} />
                                        </div>
                                    </div>

                                    {isExpanded && isCompleted && showFullInfoFor !== course.id ? (
                                        <div className="catalog-card-details" onClick={e => e.stopPropagation()} style={{ borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
                                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                                                    <CheckCircle size={22} color="#10b981" />
                                                    <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1.2rem', color: '#10b981' }}>{c.completed}</h4>
                                                    {(() => {
                                                        const transcriptCourse = mockTranscript?.find(t => t.course_code === course.code);
                                                        const userReview = mockReviews[course.id]?.find(r => r.authorId === user?.id);
                                                        const grade = transcriptCourse?.grade || userReview?.grade || ["A", "A-", "B+", "B", "A"][course.id % 5] || "A";
                                                        return <span style={{ marginLeft: 'auto', background: 'rgba(16, 185, 129, 0.2)', padding: '6px 12px', borderRadius: '8px', color: '#10b981', fontWeight: 700, fontSize: '1rem' }}>{c.grade} {grade}</span>;
                                                    })()}
                                                </div>
                                                
                                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    {(() => {
                                                        const userReview = mockReviews[course.id]?.find(r => r.authorId === user?.id);
                                                        if (userReview) {
                                                            return (
                                                                <>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                                                        <h5 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem' }}>{c.yourReview}</h5>
                                                                    </div>
                                                                    {userReview.questions?.map((q, i) => (
                                                                        <div key={i} style={{ marginBottom: '1rem' }}>
                                                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{q.q}</p>
                                                                            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{q.a}</p>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            );
                                                        }
                                                        return (
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{c.noReview}</span>
                                                                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>{c.leaveReview}</button>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                                <button 
                                                    className="btn-secondary" 
                                                    style={{ width: '100%', padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'background 0.2s', fontWeight: 600 }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowFullInfoFor(course.id);
                                                    }}
                                                >
                                                    <ChevronDown size={18} /> {c.showFullInfo}
                                                </button>
                                            </div>
                                        </div>
                                    ) : isExpanded && (
                                        <div className="catalog-card-details">
                                            {/* Top Header Row of Details */}
                                            <div className="expanded-header">
                                                <span className={`teaching-format-badge ${course.teachingFormat === 'Regular' ? 'regular' : 'flipped'}`}>
                                                    {course.teachingFormat === 'Regular' ? 'Класичний формат' : 'Flipped Classroom'}
                                                </span>
                                                <span className="max-points-badge">
                                                    Максимум: <span style={{fontWeight: 'bold', color: 'var(--text-main)'}}>{course.maxPoints}</span> балів
                                                </span>
                                                {hasPreviousGen && (
                                                    <button
                                                        className={`changes-toggle-btn ${isChangesActive ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setChangesMode(prev => ({ ...prev, [course.id]: !prev[course.id] }));
                                                        }}
                                                        title={isChangesActive ? c.changes.hideChanges : c.changes.showChanges}
                                                    >
                                                        <GitCompareArrows size={14} />
                                                        {isChangesActive ? c.changes.hideChanges : c.changes.showChanges}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Changes Summary Banner */}
                                            {isChangesActive && changes && changes.hasChanges && (
                                                <div className="changes-summary-banner">
                                                    <GitCompareArrows size={14} />
                                                    <span>{changes.totalChanges} {c.changes.fieldsChanged}</span>
                                                </div>
                                            )}

                                            <div className="expanded-dashboard-v2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                                                
                                                {/* Zone 1: Instructor & Syllabus Download */}
                                                <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', gridColumn: '1 / -1', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                    <img src={course.instructorPhoto} alt={course.instructor} className="instructor-avatar-large" onClick={(e) => handleInstructorClick(e, course)} style={{ width: '64px', height: '64px', borderRadius: '32px', objectFit: 'cover', cursor: 'pointer', transition: 'opacity 0.15s', }} onMouseEnter={e => e.target.style.opacity='0.8'} onMouseLeave={e => e.target.style.opacity='1'} />
                                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                                        <h4 onClick={(e) => handleInstructorClick(e, course)} style={{ margin: '0 0 0.25rem 0', fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-main)', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.15s' }} onMouseEnter={e => e.target.style.textDecorationColor='currentColor'} onMouseLeave={e => e.target.style.textDecorationColor='transparent'}>{course.instructor}</h4>

                                                        {course.instructorBio && (
                                                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                                                {course.instructorBio}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                        {course.instructorLinkedIn && (
                                                            <a href={course.instructorLinkedIn} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0A66C2' }}>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Teacher's Comment on Changes */}
                                                {isChangesActive && changes && changes.hasChanges && mockPreviousGeneration[course.id]?.teacherComment && (
                                                    <div className="dashboard-zone glass-panel teacher-comment-zone" style={{ padding: '1.25rem', background: 'rgba(139, 92, 246, 0.06)', borderRadius: '12px', gridColumn: '1 / -1', borderLeft: '4px solid #8b5cf6', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#c4b5fd', fontWeight: 600 }}>
                                                            <MessageCircle size={18} />
                                                            <span>Коментар викладача щодо змін у курсі</span>
                                                        </div>
                                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.5', fontStyle: 'italic' }}>
                                                            "{mockPreviousGeneration[course.id].teacherComment}"
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Zone 2: Short Syllabus (Description) or Detailed Syllabus */}
                                                <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', gridColumn: '1 / -1' }}>
                                                    {course.detailedSyllabus ? (
                                                        <>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                                <h4 className="dashboard-heading" style={{ margin: 0 }}>Детальний огляд силабусу</h4>
                                                                <a href={course.syllabusUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                                                                    <FileText size={16} /> Завантажити PDF
                                                                </a>
                                                            </div>
                                                            <div className="detailed-syllabus text-sm" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                                                                
                                                                <div>
                                                                    <h5 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Обґрунтування курсу</h5>
                                                                    <p style={{ margin: 0, marginBottom: '1rem' }}>{course.detailedSyllabus.justification}</p>
                                                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa' }}></span>Лекції: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{course.lectureHours} год</span>{isChangesActive && getNumericDiff(changes, 'lectureHours') && renderNumericChange(getNumericDiff(changes, 'lectureHours'))}</div>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></span>Практика: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{course.practiceHours} год</span>{isChangesActive && getNumericDiff(changes, 'practiceHours') && renderNumericChange(getNumericDiff(changes, 'practiceHours'))}</div>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>Самостійна робота: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{course.selfStudyHours} год</span>{isChangesActive && getNumericDiff(changes, 'selfStudyHours') && renderNumericChange(getNumericDiff(changes, 'selfStudyHours'))}</div>
                                                                    </div>
                                                                </div>

                                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                                                    {['mustHave', 'niceToHave'].map(prereqType => (
                                                                        <div key={prereqType}>
                                                                            <h5 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                                                {prereqType === 'mustHave' ? 'Передумови (Must Have)' : 'Бажані (Nice to Have)'}
                                                                            </h5>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                {course.detailedSyllabus.prerequisites[prereqType].map((item, i) => {
                                                                                    const prereqCourse = mockCatalog.find(c => item.includes(c.code) || item.includes(c.name));
                                                                                    if (prereqCourse) {
                                                                                        const isCompleted = activeCourseIds.has(prereqCourse.id);
                                                                                        return (
                                                                                            <div 
                                                                                                key={i}
                                                                                                className="rec-card glass-panel" 
                                                                                                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', border: isCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.03)' }}
                                                                                                onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    setSearch(prereqCourse.code);
                                                                                                    setFilterType('all');
                                                                                                    setActiveFilters(defaultFilters);
                                                                                                    setPendingFilters(defaultFilters);
                                                                                                    setExpanded(prereqCourse.id);
                                                                                                    setTimeout(() => {
                                                                                                        const el = document.querySelector(`.catalog-card.expanded`);
                                                                                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                                                    }, 100);
                                                                                                }}
                                                                                            >
                                                                                                <div className="rec-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                                                    <div>
                                                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                                            <span className="course-code-badge" style={{ display: 'inline-flex', alignItems: 'center', height: '22px', fontSize: '0.75rem', padding: '0 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>{prereqCourse.code}</span>
                                                                                                            {isCompleted && <span style={{ display: 'inline-flex', alignItems: 'center', height: '22px', fontSize: '0.75rem', padding: '0 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 600, gap: '4px' }}><CheckCircle size={12} strokeWidth={2.5} /> Пройдено</span>}
                                                                                                        </div>
                                                                                                        <h3 style={{ margin: '4px 0 0', fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{prereqCourse.name}</h3>
                                                                                                    </div>
                                                                                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>{prereqCourse.credits} ECTS</div>
                                                                                                </div>
                                                                                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> <span>{prereqCourse.semester}</span></div>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> <span>{prereqCourse.instructor}</span></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                    return <div key={i} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.9rem' }}>• {item}</div>;
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <div>
                                                                    <h5 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Цілі курсу</h5>
                                                                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                                                        {course.detailedSyllabus.goals.map((item, i) => <li key={i}>{item}</li>)}
                                                                    </ul>
                                                                </div>

                                                                <div>
                                                                    <h5 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Результати навчання</h5>
                                                                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                                                        {course.detailedSyllabus.outcomes.map((item, i) => <li key={i}>{item}</li>)}
                                                                    </ul>
                                                                </div>

                                                                <div>
                                                                    <h5 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '0.95rem' }}>Політика оцінювання</h5>
                                                                    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                                        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                                                                            <thead>
                                                                                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                                                    <th style={{ padding: '10px', color: 'var(--text-main)' }}>Вид діяльності</th>
                                                                                    <th style={{ padding: '10px', color: 'var(--text-main)' }}>Деталі</th>
                                                                                    <th style={{ padding: '10px', color: 'var(--text-main)', textAlign: 'center' }}>Балів за етап</th>
                                                                                    <th style={{ padding: '10px', color: 'var(--text-main)', textAlign: 'center' }}>Всього балів</th>
                                                                                    <th style={{ padding: '10px', color: 'var(--text-main)' }}>Дедлайн</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {course.detailedSyllabus.gradingTable.map((row, i) => (
                                                                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                        <td style={{ padding: '10px', fontWeight: 600 }}>{row.type}</td>
                                                                                        <td style={{ padding: '10px', opacity: 0.8 }}>{row.details}</td>
                                                                                        <td style={{ padding: '10px', textAlign: 'center' }}>{row.perItem}</td>
                                                                                        <td style={{ padding: '10px', textAlign: 'center', fontWeight: 600, color: '#3b82f6' }}>{row.total}</td>
                                                                                        <td style={{ padding: '10px', opacity: 0.8 }}>{row.deadline}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                                                                    <td colSpan="3" style={{ padding: '10px', fontWeight: 'bold', color: 'var(--text-main)', textAlign: 'right' }}>Разом</td>
                                                                                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#10b981', fontSize: '0.9rem' }}>100</td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h4 className="dashboard-heading" style={{ marginBottom: '0.5rem' }}>Короткий опис дисципліни</h4>
                                                            <p className="catalog-description text-sm" style={{ lineHeight: '1.5', margin: 0, marginBottom: '1rem' }}>{course.description}</p>
                                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa' }}></span>Лекції: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{course.lectureHours} год</span>{isChangesActive && getNumericDiff(changes, 'lectureHours') && renderNumericChange(getNumericDiff(changes, 'lectureHours'))}</div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></span>Практика: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{course.practiceHours} год</span>{isChangesActive && getNumericDiff(changes, 'practiceHours') && renderNumericChange(getNumericDiff(changes, 'practiceHours'))}</div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>Самостійна робота: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{course.selfStudyHours} год</span>{isChangesActive && getNumericDiff(changes, 'selfStudyHours') && renderNumericChange(getNumericDiff(changes, 'selfStudyHours'))}</div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Zone 3: Timeline */}
                                                <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', gridColumn: '1 / -1' }}>
                                                    <h4 className="dashboard-heading" style={{ marginBottom: '0.5rem' }}>Розклад (Семестр)</h4>
                                                    <div className="timeline-container">
                                                        <div className="timeline-labels text-xs" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '0 4px' }}>
                                                            {(() => {
                                                                const termStart = getCourseDates(course.semester, 1, 1).start;
                                                                const termEnd = getCourseDates(course.semester, course.termLength, 1).end;
                                                                return (
                                                                    <>
                                                                        <span>{termStart}</span>
                                                                        <span>{termEnd}</span>
                                                                    </>
                                                                );
                                                            })()}
                                                        </div>
                                                        <div className="timeline-track" style={{ 
                                                            position: 'relative', height: '14px', 
                                                            background: `repeating-linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.05) calc(100% / ${course.termLength} - 1px), rgba(255,255,255,0.2) calc(100% / ${course.termLength} - 1px), rgba(255,255,255,0.2) calc(100% / ${course.termLength}))`, 
                                                            borderRadius: '4px', marginTop: '4px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' 
                                                        }}>
                                                            <div className="timeline-fill" style={{ 
                                                                position: 'absolute', height: '100%', 
                                                                left: `${((course.startWeek - 1) / course.termLength) * 100}%`, width: `${(course.duration / course.termLength) * 100}%`,
                                                                background: 'rgba(59, 130, 246, 0.45)', borderLeft: '2px solid #3b82f6', borderRight: '2px solid #3b82f6',
                                                                boxShadow: 'inset 0 0 10px rgba(59,130,246,0.2)'
                                                            }}></div>
                                                        </div>
                                                        <div className="text-center text-xs mt-xs" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <Clock size={12} /> Проходить: 
                                                            {(() => {
                                                                const dates = getCourseDates(course.semester, course.startWeek, course.duration);
                                                                return (
                                                                    <>
                                                                        <span style={{color: 'var(--text-main)', fontWeight: 600}}> {dates.start} — {dates.end}</span>
                                                                        <span style={{ fontSize: '0.65rem', marginLeft: 'auto', opacity: 0.7 }}>({course.duration} тижнів)</span>
                                                                    </>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button 
                                                    className="btn-secondary catalog-stats-toggle text-sm" 
                                                    style={{ gridColumn: '1 / -1', padding: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)', transition: '0.2s all' }}
                                                    onClick={(e) => { e.stopPropagation(); setShowExtendedStats(!showExtendedStats); }}
                                                    onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                                                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                                                >
                                                    {showExtendedStats ? 'Згорнути детальну статистику' : 'Розгорнути детальну статистику'}
                                                </button>

                                                {showExtendedStats && (
                                                    <>
                                                        {/* Zone 4: Average Grade */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                                                            <h4 className="dashboard-heading">Середній бал</h4>
                                                            <div className="stat-linear-container" style={{ marginTop: 'auto', marginBottom: 'auto', width: '100%' }}>
                                                                <div className="linear-label" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                                                    <span style={{fontWeight: 600, color: 'var(--text-main)'}}>{course.historicalAverage}</span>
                                                                    <span className="text-muted text-sm ml-xs"> / {course.maxPoints}</span>
                                                                </div>
                                                                <div className="linear-progress-bg mt-xs">
                                                                    <div className="linear-progress-fill" style={{ width: `${(course.historicalAverage / course.maxPoints) * 100}%` }}></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Zone 5: % Закриття дисципліни */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <h4 className="dashboard-heading" style={{ alignSelf: 'flex-start', width: '100%' }}>% закриття дисципліни</h4>
                                                            <div className="stat-ring-container" style={{ marginTop: '0.5rem' }}>
                                                                <svg className="radial-progress" viewBox="0 0 36 36">
                                                                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                                    <path className="circle-fill" strokeDasharray={`${course.passRate60Plus}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                                    <text x="18" y="20.35" className="percentage">{course.passRate60Plus}%</text>
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        {/* Zone 6: Practice vs Theory Line */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                            <h4 className="dashboard-heading">Лекційні vs Практичні години</h4>
                                                            <div style={{ marginTop: '1.5rem', position: 'relative', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '7px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                                <div style={{ position: 'absolute', top: '-6px', bottom: '-6px', width: '4px', background: '#a855f7', left: `calc(${course.practicePercentage}% - 2px)`, borderRadius: '2px', boxShadow: '0 0 10px #a855f7', zIndex: 2 }}></div>
                                                                <div style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.3)', zIndex: 1 }}></div>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                                <span>Лекції: <span style={{color: 'var(--text-main)', fontWeight: 600}}>{course.lectureHours} год</span></span>
                                                                <span>Баланс</span>
                                                                <span>Практика: <span style={{color: 'var(--text-main)', fontWeight: 600}}>{course.practiceHours} год</span></span>
                                                            </div>
                                                        </div>

                                                        {/* Zone 7: Grading Breakdown Donut Pie Chart */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <h4 className="dashboard-heading" style={{ alignSelf: 'flex-start', width: '100%' }}>Розподіл оцінювання</h4>
                                                            <div style={{ 
                                                                position: 'relative', marginTop: '0.5rem', width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                                                background: `conic-gradient(
                                                                    #ef4444 0% ${course.gradingBreakdown?.exam || 40}%, 
                                                                    #3b82f6 ${course.gradingBreakdown?.exam || 40}% ${(course.gradingBreakdown?.exam || 40) + (course.gradingBreakdown?.project || 30)}%, 
                                                                    #10b981 ${(course.gradingBreakdown?.exam || 40) + (course.gradingBreakdown?.project || 30)}% 100%
                                                                )` 
                                                            }}>
                                                                <div style={{ position: 'absolute', top: '25%', left: '25%', right: '25%', bottom: '25%', background: '#0f172a', borderRadius: '50%' }}></div>
                                                            </div>
                                                            <div className="text-xs" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem', width: '100%' }}>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><div style={{width: 10, height: 10, background: '#ef4444', borderRadius: '3px'}}></div> Іспит <span style={{color: 'var(--text-main)', marginLeft: 'auto', fontWeight: 600}}>{course.gradingBreakdown?.exam || 40}%</span></span>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><div style={{width: 10, height: 10, background: '#3b82f6', borderRadius: '3px'}}></div> Проєкт <span style={{color: 'var(--text-main)', marginLeft: 'auto', fontWeight: 600}}>{course.gradingBreakdown?.project || 30}%</span></span>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><div style={{width: 10, height: 10, background: '#10b981', borderRadius: '3px'}}></div> Домашні завдання <span style={{color: 'var(--text-main)', marginLeft: 'auto', fontWeight: 600}}>{course.gradingBreakdown?.homework || 30}%</span></span>
                                                            </div>
                                                        </div>

                                                        {/* Zone 8: Enrollment Type (Mandatory vs Elective) Donut Pie Chart */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <h4 className="dashboard-heading" style={{ alignSelf: 'flex-start', width: '100%' }}>Для кого курс</h4>
                                                            <div style={{ position: 'relative', marginTop: '0.5rem', width: '80px', height: '80px', borderRadius: '50%', background: `conic-gradient(#ef4444 0% ${course.enrollmentType?.mandatory || 50}%, #3b82f6 ${course.enrollmentType?.mandatory || 50}% 100%)`, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
                                                                <div style={{ position: 'absolute', top: '25%', left: '25%', right: '25%', bottom: '25%', background: '#0f172a', borderRadius: '50%' }}></div>
                                                            </div>
                                                            <div className="text-xs" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem', width: '100%' }}>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><div style={{width: 10, height: 10, background: '#ef4444', borderRadius: '3px'}}></div> Студенти, для яких обов'язковий: <span style={{color: 'var(--text-main)', marginLeft: 'auto', fontWeight: 600}}>{course.enrollmentType?.mandatory || 50}%</span></span>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}><div style={{width: 10, height: 10, background: '#3b82f6', borderRadius: '3px'}}></div> Студенти, які обрали: <span style={{color: 'var(--text-main)', marginLeft: 'auto', fontWeight: 600}}>{course.enrollmentType?.elective || 50}%</span></span>
                                                            </div>
                                                        </div>

                                                        {/* Zone 9: Faculties Pie Chart Donut Pie Chart */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <h4 className="dashboard-heading" style={{ alignSelf: 'flex-start', width: '100%' }}>Факультети-слухачі</h4>
                                                            <div style={{ 
                                                                position: 'relative', marginTop: '0.5rem', width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                                                background: `conic-gradient(
                                                                    #10b981 0% ${course.facultySplit?.[0].value || 33}%, 
                                                                    #f59e0b ${course.facultySplit?.[0].value || 33}% ${(course.facultySplit?.[0].value || 33) + (course.facultySplit?.[1].value || 33)}%, 
                                                                    #a855f7 ${(course.facultySplit?.[0].value || 33) + (course.facultySplit?.[1].value || 33)}% 100%
                                                                )` 
                                                            }}>
                                                                <div style={{ position: 'absolute', top: '25%', left: '25%', right: '25%', bottom: '25%', background: '#0f172a', borderRadius: '50%' }}></div>
                                                            </div>
                                                            <div className="text-xs" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem', width: '100%' }}>
                                                                {course.facultySplit?.map((f, i) => (
                                                                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                                                                        <div style={{width: 10, height: 10, background: ['#10b981', '#f59e0b', '#a855f7'][i], borderRadius: '3px'}}></div> 
                                                                        {f.name}: <span style={{color: 'var(--text-main)', marginLeft: 'auto', fontWeight: 600}}>{f.value}%</span>
                                                                    </span>
                                                                )) || null}
                                                            </div>
                                                        </div>

                                                        {/* Zone 10: Score Gaining Timeline (Weekly Points Bar Chart) */}
                                                        <div className="dashboard-zone glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                                                            <h4 className="dashboard-heading" style={{ marginBottom: '1rem' }}>Динаміка набору балів</h4>
                                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '140px', width: '100%', paddingBottom: '0.5rem', position: 'relative' }}>
                                                                {(() => {
                                                                    const maxWeeklyPoints = Math.max(...(course.weeklyPoints || [1])); // prevent div by zero
                                                                    const totalExam = Math.round((course.maxPoints || 100) * (course.gradingBreakdown?.exam || 0) / 100);
                                                                    const totalProj = Math.round((course.maxPoints || 100) * (course.gradingBreakdown?.project || 0) / 100);
                                                                    
                                                                    const totalTermLength = course.termLength || 15;
                                                                    const startWk = (course.startWeek || 1) - 1;
                                                                    const endWk = startWk + course.duration - 1;

                                                                    let remExam = totalExam;
                                                                    let remProj = totalProj;
                                                                    
                                                                    const activeAllocations = [];
                                                                    for (let i = course.duration - 1; i >= 0; i--) {
                                                                        let pts = course.weeklyPoints[i] || 0;
                                                                        let examPts = 0, projPts = 0, hwPts = 0;
                                                                        
                                                                        if (remExam > 0) {
                                                                            let take = Math.min(pts, remExam);
                                                                            examPts = take;
                                                                            remExam -= take;
                                                                            pts -= take;
                                                                        }
                                                                        if (pts > 0 && remProj > 0) {
                                                                            let take = Math.min(pts, remProj);
                                                                            projPts = take;
                                                                            remProj -= take;
                                                                            pts -= take;
                                                                        }
                                                                        hwPts = pts;
                                                                        
                                                                        activeAllocations.unshift({ total: course.weeklyPoints[i] || 0, hw: hwPts, proj: projPts, exam: examPts });
                                                                    }

                                                                    const fullTimelineObj = [];
                                                                    for (let i = 0; i < totalTermLength; i++) {
                                                                        if (i >= startWk && i <= endWk) {
                                                                            fullTimelineObj.push(activeAllocations[i - startWk]);
                                                                        } else {
                                                                            fullTimelineObj.push({ total: 0, hw: 0, proj: 0, exam: 0, empty: true });
                                                                        }
                                                                    }
                                                                    
                                                                    return fullTimelineObj.map((alloc, idx) => {
                                                                        const pts = alloc.total;
                                                                        const heightPct = pts > 0 ? (pts / maxWeeklyPoints) * 100 : 0;
                                                                        const weekDate = getCourseDates(course.semester, idx + 1, 1).start.substring(0, 5);
                                                                        
                                                                        return (
                                                                            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end', group: 'bar' }} title={alloc.empty ? `Тиждень ${idx + 1} (${weekDate}): Занять немає` : `Тиждень ${idx + 1} (${weekDate}): ${pts} балів\nІспит: ${alloc.exam}\nПроєкт: ${alloc.proj}\nДЗ: ${alloc.hw}`}>
                                                                                <span style={{ fontSize: '0.65rem', color: pts > 0 ? 'var(--text-main)' : 'transparent', fontWeight: 600 }}>{pts > 0 ? pts : '-'}</span>
                                                                                <div style={{ 
                                                                                    width: '100%', 
                                                                                    height: pts > 0 ? `${heightPct}%` : '2px', 
                                                                                    minHeight: pts > 0 ? '4px' : '2px',
                                                                                    background: pts > 0 ? `linear-gradient(to top, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, ${0.4 + (pts/maxWeeklyPoints)*0.6}))` : 'rgba(255,255,255,0.03)',
                                                                                    borderRadius: '4px 4px 0 0',
                                                                                    borderTop: pts > 0 ? '2px solid #3b82f6' : 'none',
                                                                                    transition: '0.2s all',
                                                                                    cursor: 'crosshair',
                                                                                    opacity: alloc.empty ? 0.3 : 0.9
                                                                                }} className="hover:opacity-100"></div>
                                                                                <span style={{ fontSize: '0.55rem', color: alloc.empty ? 'rgba(255,255,255,0.2)' : 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap' }}>{weekDate}</span>
                                                                                {alloc.exam > 0 && <span style={{ fontSize: '0.45rem', color: '#ef4444', textTransform: 'uppercase', marginTop: '1px', fontWeight: 600 }}>Іспит</span>}
                                                                                {alloc.proj > 0 && <span style={{ fontSize: '0.45rem', color: '#3b82f6', textTransform: 'uppercase', marginTop: '1px', fontWeight: 600 }}>Проєкт</span>}
                                                                            </div>
                                                                        );
                                                                    });
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Text & Grading Changes Panel */}
                                            {isChangesActive && changes && changes.hasChanges && (
                                                <div className="changes-detail-panel" onClick={(e) => e.stopPropagation()}>
                                                    {/* Grading breakdown diffs */}
                                                    {changes.gradingDiffs.length > 0 && (
                                                        <div className="changes-grading-section">
                                                            <h4 className="dashboard-heading" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>Зміни у розподілі оцінювання</h4>
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                                                {changes.gradingDiffs.map(gd => (
                                                                    <div key={gd.key} className="grading-diff-item">
                                                                        <span className="grading-diff-label">{gd.label}</span>
                                                                        <div className="grading-diff-values">
                                                                            <span className="grading-diff-old">{gd.oldVal}%</span>
                                                                            <span className="grading-diff-arrow">→</span>
                                                                            <span className="grading-diff-new">{gd.newVal}%</span>
                                                                            {renderNumericChange(gd)}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Text diffs */}
                                                    {changes.textDiffs.length > 0 && (
                                                        <div className="changes-text-section">
                                                            <h4 className="dashboard-heading" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>Текстові зміни</h4>
                                                            {changes.textDiffs.map(td => renderTextChange(td))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <button
                                                className={`btn-primary mt-sm ${isWishlisted ? 'btn-wishlisted' : ''}`}
                                                disabled={isLoading}
                                                onClick={(e) => handleWishlistToggle(e, course)}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 size={16} className="spin-icon" />
                                                        Зачекайте...
                                                    </>
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

                                            {/* ===== REVIEWS SECTION ===== */}
                                            {courseReviews.length > 0 && (
                                                <div className="course-reviews-section" onClick={(e) => e.stopPropagation()}>
                                                    {/* Reviews Header */}
                                                    <div className="reviews-header">
                                                        <div className="reviews-header-left">
                                                            <Star size={16} color="#F59E0B" fill="#F59E0B" />
                                                            <span>Відгуки студентів</span>
                                                            <span className="reviews-count-badge">{courseReviews.length}</span>
                                                        </div>
                                                        <div className="reviews-header-actions">
                                                            <button
                                                                className={`btn-ai-summarize ${aiState.loading ? 'loading' : ''}`}
                                                                onClick={(e) => handleAiSummarize(e, course.id)}
                                                                disabled={aiState.loading}
                                                                title="Згенерувати спільне резюме всіх відгуків за допомогою ШІ"
                                                            >
                                                                {aiState.loading ? (
                                                                    <><Loader2 size={13} className="spin" /> Аналіз...</>
                                                                ) : (
                                                                    <><Sparkles size={13} /> ШІ-резюме</>  
                                                                )}
                                                            </button>
                                                            <button
                                                                className="reviews-toggle-btn"
                                                                onClick={(e) => { e.stopPropagation(); setReviewsExpanded(prev => ({ ...prev, [course.id]: !isReviewsExpanded })); }}
                                                            >
                                                                {isReviewsExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                                                                {isReviewsExpanded ? 'Згорнути' : 'Показати'}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* AI Summary Panel */}
                                                    {aiState.summary && (
                                                        <div className="ai-summary-panel">
                                                            <div className="ai-summary-title">
                                                                <Sparkles size={14} />
                                                                ШІ-резюме всіх відгуків
                                                            </div>
                                                            <div className="ai-summary-questions">
                                                                {aiState.summary.map((item, i) => (
                                                                    <div key={i} className="ai-summary-qa">
                                                                        <div className="ai-summary-q">{item.q}</div>
                                                                        <div className="ai-summary-a">{item.a}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Individual Reviews */}
                                                    {isReviewsExpanded && (
                                                        <div className="reviews-list">
                                                            {(() => {
                                                                // Compute per-course review labels
                                                                const labelMap = {};
                                                                if (courseReviews.length > 1) {
                                                                    const maxLikes = Math.max(...courseReviews.map(r => r.likes));
                                                                    const maxVotes = Math.max(...courseReviews.map(r => r.likes + (r.dislikes || 0)));
                                                                    const maxLen   = Math.max(...courseReviews.map(r => r.questions.reduce((s, q) => s + q.a.length, 0)));
                                                                    const newest   = courseReviews.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b);
                                                                    courseReviews.forEach(r => {
                                                                        const labels = [];
                                                                        const totalAns = r.questions.reduce((s, q) => s + q.a.length, 0);
                                                                        const totalVotes = r.likes + (r.dislikes || 0);
                                                                        if (r.likes === maxLikes && maxLikes > 0)
                                                                            labels.push({ text: 'Найкорисніший відгук', icon: '🏆', cls: 'label-liked-gold' });
                                                                        if (totalVotes === maxVotes && maxVotes > 0 && r.likes !== maxLikes)
                                                                            labels.push({ text: 'Найпопулярніший', icon: '👁', cls: 'label-popular' });
                                                                        if (totalAns === maxLen && maxLen > 100)
                                                                            labels.push({ text: 'Найдетальніший', icon: '📝', cls: 'label-detailed' });
                                                                        if (r.id === newest.id)
                                                                            labels.push({ text: 'Найновіший', icon: '🕐', cls: 'label-new' });
                                                                        if (labels.length) labelMap[r.id] = labels;
                                                                    });
                                                                }
                                                                return courseReviews.map(review => {
                                                                const author = review.isAnonymous ? null : getUserById(review.authorId);
                                                                const myVote = reviewVotes[review.id] || null;
                                                                const reviewLabels = labelMap[review.id] || [];
                                                                return (
                                                                    <div key={review.id} className="review-card" style={reviewLabels.some(lbl => lbl.cls === 'label-liked-gold') ? { border: '2px solid #F59E0B', background: 'rgba(245, 158, 11, 0.05)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)' } : {}}>
                                                                        {reviewLabels.length > 0 && (
                                                                            <div className="review-labels-row" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                                                {reviewLabels.map((lbl, li) => (
                                                                                    <span key={li} className={`review-label ${lbl.cls}`} style={lbl.cls === 'label-liked-gold' ? { background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' } : undefined}>
                                                                                        {lbl.icon} {lbl.text}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                        {/* Review Header: author + date */}
                                                                        <div className="review-card-header">
                                                                            <div className="review-author">
                                                                                {review.isAnonymous ? (
                                                                                    <div className="review-avatar anon">
                                                                                        <User size={13} />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div
                                                                                        className="review-avatar"
                                                                                        style={{ background: author?.avatarColor }}
                                                                                        onClick={(e) => author && handleProfileClick(e, author.id)}
                                                                                    >
                                                                                        <User size={13} />
                                                                                    </div>
                                                                                )}
                                                                                <div className="review-author-info">
                                                                                    <span
                                                                                        className={`review-author-name ${!review.isAnonymous ? 'clickable' : ''}`}
                                                                                        onClick={(e) => !review.isAnonymous && author && handleProfileClick(e, author.id)}
                                                                                    >
                                                                                        {review.isAnonymous ? 'Анонімно' : `${author?.first_name} ${author?.last_name}`}
                                                                                    </span>
                                                                                    <div className="review-author-meta">
                                                                                        {!review.isAnonymous && author && (
                                                                                            <span className="review-meta-tag specialization">
                                                                                                <GraduationCap size={10} />
                                                                                                {author.major}
                                                                                            </span>
                                                                                        )}
                                                                                        {review.grade && (
                                                                                            <span className="review-meta-tag grade">
                                                                                                <Award size={10} />
                                                                                                {review.grade}
                                                                                            </span>
                                                                                        )}
                                                                                        {review.gpa && (
                                                                                            <span className="review-meta-tag gpa">
                                                                                                <BarChart2 size={10} />
                                                                                                GPA {Math.round(review.gpa)}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <span className="review-date">
                                                                                <Calendar size={11} />
                                                                                {formatReviewDate(review.date)}
                                                                            </span>
                                                                        </div>

                                                                        {/* Q&A */}
                                                                        <div className="review-qa-list">
                                                                            {review.questions.map((item, qi) => (
                                                                                <div key={qi} className="review-qa-item">
                                                                                    <div className="review-question">{item.q}</div>
                                                                                    <div className="review-answer">{item.a}</div>
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                        {/* Like / Dislike */}
                                                                        <div className="review-vote-row">
                                                                            <span className="review-helpful-label">Чи був корисним цей відгук?</span>
                                                                            <button
                                                                                className={`review-vote-btn like ${myVote === 'like' ? 'active' : ''}`}
                                                                                onClick={(e) => handleReviewVote(e, review.id, 'like')}
                                                                                title="Корисно"
                                                                            >
                                                                                <ThumbsUp size={13} />
                                                                                {review.likes}
                                                                            </button>
                                                                            <button
                                                                                className={`review-vote-btn dislike ${myVote === 'dislike' ? 'active' : ''}`}
                                                                                onClick={(e) => handleReviewVote(e, review.id, 'dislike')}
                                                                                title="Не корисно"
                                                                            >
                                                                                <ThumbsDown size={13} />
                                                                                {review.dislikes}
                                                                            </button>
                                                                        </div>
                                                                            {/* Per-Review Comments */}
                                                                            <div className="review-comments-section" onClick={(e) => e.stopPropagation()}>
                                                                                <button
                                                                                    className="review-comments-toggle"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setExpandedReviewComments(prev => ({ ...prev, [review.id]: !prev[review.id] }));
                                                                                    }}
                                                                                >
                                                                                    <MessageCircle size={12} />
                                                                                    {(reviewComments[review.id] || []).length > 0
                                                                                        ? `${(reviewComments[review.id] || []).length} коментар(і)`
                                                                                        : 'Коментувати'}
                                                                                </button>
                                                                                {expandedReviewComments[review.id] && (
                                                                                    <div className="review-comments-list">
                                                                                        {(reviewComments[review.id] || []).map(cmt => {
                                                                                            const cmtAuthor = getUserById(cmt.userId);
                                                                                            return (
                                                                                                <div key={cmt.id} className="review-comment-item">
                                                                                                    <div className="review-comment-avatar" style={{ background: cmtAuthor?.avatarColor || '#6366f1' }}>
                                                                                                        <User size={11} />
                                                                                                    </div>
                                                                                                    <div className="review-comment-body">
                                                                                                        <span className="review-comment-nick">@{cmtAuthor?.nickname ?? 'Анонім'}</span>
                                                                                                        <span className="review-comment-time">{formatTimeAgo(cmt.timestamp)}</span>
                                                                                                        <p className="review-comment-text">{cmt.text}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                        <form
                                                                                            className="review-comment-form"
                                                                                            onSubmit={(e) => handleReviewCommentSubmit(e, review.id)}
                                                                                        >
                                                                                            <div className="review-comment-input-avatar" style={{ background: user ? '#2563EB' : '#4b5563' }}>
                                                                                                <User size={11} />
                                                                                            </div>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="review-comment-input"
                                                                                                placeholder={user ? "Залишити коментар..." : "Увійдіть, щоб коментувати"}
                                                                                                disabled={!user}
                                                                                                value={reviewCommentInputs[review.id] || ''}
                                                                                                onChange={(e) => setReviewCommentInputs(prev => ({ ...prev, [review.id]: e.target.value }))}
                                                                                                onClick={(e) => e.stopPropagation()}
                                                                                            />
                                                                                            <button
                                                                                                type="submit"
                                                                                                className="review-comment-send-btn"
                                                                                                disabled={!user || !(reviewCommentInputs[review.id] || '').trim()}
                                                                                                onClick={(e) => e.stopPropagation()}
                                                                                            >
                                                                                                <Send size={13} />
                                                                                            </button>
                                                                                        </form>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {!user && (
                                                                                <div className="login-nudge glass-panel" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                                                                    <Lock size={14} color="var(--color-accent)" />
                                                                                    <span className="text-sm">{c.loginNudge}</span>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                );
                                                                });
                                                            })()}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </div>
                            );
                            }; // end renderCard

                            return (
                                <>
                                    {pinActive && !user && (
                                        <div className="active-courses-login-nudge">
                                            Увійдіть в акаунт, щоб побачити ваші активні курси вгорі
                                        </div>
                                    )}
                                    {pinnedCourses.length > 0 && (
                                        <>
                                            <div className="active-courses-header">
                                                <Pin size={13} />
                                                <span>{c.activeCourses}</span>
                                                <span className="active-courses-count">{pinnedCourses.length}</span>
                                            </div>
                                            {pinnedCourses.map(courseObj => renderCard(courseObj, true))}
                                            {restCourses.length > 0 && <div className="active-courses-divider" />}
                                        </>
                                    )}
                                    {restCourses.map(courseObj => renderCard(courseObj, false))}
                                    {sorted.length === 0 && (
                                        <div className="catalog-empty">
                                            <Search size={48} className="text-muted" />
                                            <p>{c.empty}</p>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCatalog;
