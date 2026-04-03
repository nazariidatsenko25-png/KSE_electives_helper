import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    User, BookOpen, GraduationCap, Calendar, Star,
    MessageSquare, Clock, Award, ArrowLeft, ShieldCheck,
    ThumbsUp, ThumbsDown, Mail, FileText, ChevronRight, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockUsers, mockReviews, mockCatalog } from '../data/mockData';

const StudentProfile = ({ userId, onBack }) => {
    const { t, language } = useApp();
    const [showReviewsModal, setShowReviewsModal] = useState(false);

    // 1. Fetch User Info
    const student = useMemo(() => {
        return mockUsers.find(u => u.id === Number(userId));
    }, [userId]);

    // 2. Fetch User's Reviews
    const userReviews = useMemo(() => {
        if (!student) return [];
        let rList = [];
        for (const [courseId, reviewsArray] of Object.entries(mockReviews)) {
            const reviewsForCourse = reviewsArray.filter(r => r.authorId === student.id);
            reviewsForCourse.forEach(review => {
                const courseInfo = mockCatalog.find(c => c.id === Number(courseId));
                if (courseInfo) {
                    rList.push({
                        ...review,
                        course: courseInfo
                    });
                }
            });
        }
        // sort by newest
        rList.sort((a, b) => new Date(b.date) - new Date(a.date));
        return rList;
    }, [student]);

    const formatDate = (isoStr) => {
        const d = new Date(isoStr);
        const localeMap = { uk: 'uk-UA', en: 'en-US', de: 'de-DE' };
        return d.toLocaleDateString(localeMap[language] || 'en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    if (!student) {
        return (
            <div className="profile-view animate-in centered">
                <div className="glass-panel text-center" style={{ padding: '3rem' }}>
                    <User size={48} className="text-muted mb-md" />
                    <h2 className="heading-2">{t.studentProfile.notFoundTitle}</h2>
                    <p className="text-muted">{t.studentProfile.notFoundDesc.replace('{userId}', userId)}</p>
                    <button className="btn-primary mt-md" onClick={onBack}>{t.studentProfile.backToProfile}</button>
                </div>
            </div>
        );
    }

    const initials = (student.first_name?.[0] || '') + (student.last_name?.[0] || '');
    const email = `${student.nickname}@kse.org.ua`;
    const mockCredits = student.current_year * 60 - 15; // Realistic looking ECTS total

    return (
        <div className="profile-view animate-in">
            {/* Back Button Overlay */}
            <div style={{ padding: '0 2rem', paddingTop: '1.5rem', zIndex: 10, position: 'relative' }}>
                <button 
                    className="btn-secondary" 
                    onClick={onBack}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none' }}
                >
                    <ArrowLeft size={16} /> {t.studentProfile.backToCatalog}
                </button>
            </div>

            {/* Hero Section */}
            <div className="profile-hero glass-panel" style={{ marginTop: '1.5rem', margin: '0 2rem' }}>
                <div className="profile-hero-bg" />
                <div className="profile-hero-content">
                    <div className="profile-avatar-section">
                        <div
                            className="profile-avatar-large"
                            style={{ background: student.avatarColor || '#3B82F6', fontSize: '2.5rem', color: '#fff' }}
                        >
                            {initials}
                        </div>
                    </div>

                    <div className="profile-hero-info">
                        <h1 className="profile-full-name">
                            {student.first_name} {student.last_name}
                            <ShieldCheck size={20} className="text-primary" style={{ marginLeft: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} title={t.studentProfile.verifiedBadge} />
                        </h1>
                        <span className="profile-major-badge">
                            <GraduationCap size={16} />
                            {student.major || t.studentProfile.studentKSE}
                        </span>
                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={14} /> @{student.nickname}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {t.studentProfile.yearOfStudy.replace('{year}', student.current_year)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="profile-grid" style={{ margin: '1.5rem 2rem' }}>
                
                {/* Left Column: Personal Info & Bio */}
                <div className="profile-left">
                    {/* Personal Info Card */}
                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <FileText size={18} className="profile-card-icon" />
                            <h2>{t.profile.personalInfo}</h2>
                        </div>
                        <div className="profile-info-list" style={{ marginTop: '1rem' }}>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <Mail size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{email}</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <BookOpen size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">{t.profile.major}</span>
                                    <span className="info-value">{student.major || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <Calendar size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">{t.profile.yearOfStudy}</span>
                                    <span className="info-value">{t.profile.yearSuffix.replace('{year}', student.current_year)}</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap">
                                    <Award size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">{t.profile.credits}</span>
                                    <span className="info-value">{mockCredits} ECTS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio Card */}
                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <User size={18} className="profile-card-icon" />
                            <h2>{t.profile.aboutMe}</h2>
                        </div>
                        <p className="bio-text" style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {student.bio || `KSE student specializing in "${student.major}". Open to networking, academic debates and collaborative multidisciplinary projects.`}
                        </p>
                    </div>

                    {/* Activity Stats Card */}
                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <Star size={18} className="profile-card-icon text-accent" />
                            <h2>{t.studentProfile.activity}</h2>
                        </div>
                        <div className="profile-info-list" style={{ marginTop: '1rem' }}>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                                    <MessageSquare size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">{t.studentProfile.reviewsWritten}</span>
                                    <span className="info-value">{userReviews.length}</span>
                                </div>
                            </div>
                            <div className="profile-info-item">
                                <div className="info-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                                    <Award size={16} />
                                </div>
                                <div className="info-details">
                                    <span className="info-label">{t.studentProfile.helpfulEarned}</span>
                                    <span className="info-value">
                                        {userReviews.reduce((sum, r) => sum + (r.likes || 0), 0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-card glass-panel">
                        <div className="profile-card-header">
                            <Award size={18} className="profile-card-icon" color="#10B981" />
                            <h2>{t.studentProfile.achievements}</h2>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                            {userReviews.length >= 1 && (
                                <span className="achievement-badge" style={{ padding: '0.4rem 0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '100px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <MessageSquare size={14} /> {t.studentProfile.beginnerWriter}
                                </span>
                            )}
                            {userReviews.reduce((sum, r) => sum + (r.likes || 0), 0) >= 10 && (
                                <span className="achievement-badge" style={{ padding: '0.4rem 0.8rem', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', borderRadius: '100px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Star size={14} /> {t.studentProfile.opinionLeader}
                                </span>
                            )}
                        </div>
                        {userReviews.length === 0 && <p className="text-muted text-sm" style={{ marginTop: '1rem' }}>{t.studentProfile.noAchievements}</p>}
                    </div>
                </div>

                {/* Right Column: Mini Dashboard for Reviews */}
                <div className="profile-right">
                    <div className="profile-card glass-panel" style={{ padding: '2rem' }}>
                        <div className="profile-card-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.5rem', borderRadius: '8px' }}>
                                    <MessageSquare size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{t.studentProfile.publicReviews}</h2>
                                    <p className="text-muted text-sm" style={{ margin: '0.2rem 0 0' }}>{t.studentProfile.sharingExperience}</p>
                                </div>
                            </div>
                            <span className="reviews-count" style={{ background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '1rem', fontWeight: 600 }}>{userReviews.length}</span>
                        </div>

                        {userReviews.length === 0 ? (
                            <div className="profile-empty-reviews" style={{ textAlign: 'center', padding: '3rem 0', background: 'rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                <MessageSquare size={32} className="text-muted mb-sm" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p className="text-muted">{t.studentProfile.noPublicReviews}</p>
                            </div>
                        ) : (
                            <div className="reviews-summary-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                
                                <div className="recent-review-preview" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.studentProfile.lastReview}</span>
                                        <div className="review-date" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={12} />
                                            {formatDate(userReviews[0].date)}
                                        </div>
                                    </div>

                                    <div className="review-course-info" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span className="review-course-code" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--background-soft)', padding: '2px 6px', borderRadius: '4px' }}>
                                                {userReviews[0].course?.code || 'N/A'}
                                            </span>
                                            <span className="review-course-title" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                                                {userReviews[0].course?.name || 'Course'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="review-preview-bubble" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--color-primary)', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                                        "{userReviews[0].questions?.[0]?.a || t.studentProfile.noText}"
                                    </div>
                                </div>

                                <button 
                                    className="btn-primary" 
                                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}
                                    onClick={() => setShowReviewsModal(true)}
                                >
                                    {t.studentProfile.viewAllReviews.replace('{count}', userReviews.length)} <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SEPARATE WINDOW (MODAL OVERLAY) FOR ALL REVIEWS */}
            {showReviewsModal && createPortal(
                <div 
                    className="reviews-modal-overlay" 
                    style={{ 
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                    onClick={() => setShowReviewsModal(false)}
                >
                    <div 
                        className="reviews-modal-content glass-panel" 
                        style={{ 
                            width: '90%', maxWidth: '900px', height: '85vh', 
                            background: 'var(--background)', border: '1px solid var(--border)',
                            borderRadius: '16px', display: 'flex', flexDirection: 'column',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Sticky */}
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.95)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', zIndex: 2 }}>
                            <div>
                                <h2 style={{ fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <MessageSquare className="text-primary" size={24} /> {t.studentProfile.allPublicReviews}
                                </h2>
                                <p className="text-muted text-sm" style={{ margin: '0.2rem 0 0 2.25rem' }}>{t.studentProfile.from} {student.first_name} {student.last_name}</p>
                            </div>
                            <button 
                                className="modal-close-btn" 
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => setShowReviewsModal(false)}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Scrollable Body */}
                        <div className="modal-body" style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                            <div className="profile-reviews-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {userReviews.map(review => (
                                    <div key={review.id} className="profile-review-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseOut={e=>e.currentTarget.style.transform='none'}>
                                        <div className="review-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                            <div className="review-course-info">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                    <span className="review-course-code" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--background-soft)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>
                                                        {review.course?.code || 'N/A'}
                                                    </span>
                                                    <div className="review-date" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Clock size={12} />
                                                        {formatDate(review.date)}
                                                    </div>
                                                </div>
                                                <div className="review-title-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                    <span className="review-course-title" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                                                        {review.course?.name || 'Course'}
                                                    </span>
                                                    {review.grade && (
                                                        <span className="review-grade-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                                                            {t.studentProfile.grade} {review.grade}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="review-qa-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                            {review.questions?.map((qa, index) => (
                                                <div key={index} className="review-qa-item" style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '3px solid var(--color-primary)' }}>
                                                    <div className="review-question" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{qa.q}</div>
                                                    <div className="review-answer" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{qa.a}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="review-vote-row" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(255,255,255,0.1)', alignItems: 'center' }}>
                                            <span className="review-helpful-label" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.studentProfile.communityRating}</span>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '12px' }}><ThumbsUp size={16} color="#3B82F6" /> {review.likes || 0}</span>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '12px' }}><ThumbsDown size={16} color="#EF4444" /> {review.dislikes || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            , document.body)}
        </div>
    );
};

export default StudentProfile;
