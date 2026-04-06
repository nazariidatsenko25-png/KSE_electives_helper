import React, { useState, useEffect } from 'react';
import { MessageSquare, Lock, Loader2, ChevronDown, Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchWithAuth } from '../utils/api';

const CourseEvaluations = ({ user, setCurrentView }) => {
    const { t } = useApp();
    const e = t.evaluations;
    
    const [submitted, setSubmitted] = useState(false);
    const [rating1, setRating1] = useState(3);
    const [rating2, setRating2] = useState(3);
    const [rating3, setRating3] = useState(3);
    const [comments, setComments] = useState('');
    const [transcript, setTranscript] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchWithAuth('/api/user/transcript/', { suppressAuthRedirect: true })
                .then(data => {
                    setTranscript(data);
                    if (data.length > 0) {
                        setSelectedCourseId(data[0].course.id);
                    }
                })
                .catch(err => console.warn('Transcript fetch unavailable (mock mode):', err.message));
        }
    }, [user]);

    const selectedEnrollment = transcript.find(t => t.course.id === selectedCourseId);
    const course = selectedEnrollment ? selectedEnrollment.course : {
        code: 'CS301',
        title: 'Операційні системи (Mock)',
        instructor: 'Д-р Алан Тюрінг',
        term: 'Весна 2026'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await fetchWithAuth('/api/reviews/', {
                method: 'POST',
                suppressAuthRedirect: true,
                body: JSON.stringify({
                    course: selectedCourseId || course.id,
                    rating_quality: rating1,
                    rating_difficulty: rating2,
                    rating_workload: rating3,
                    comment: comments,
                }),
            });
            setSubmitted(true);
        } catch (err) {
            setError(err.message || e.error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setRating1(3);
        setRating2(3);
        setRating3(3);
        setComments('');
        setError(null);
    };

    if (!user) {
        return (
            <div className="eval-view animate-in centered">
                <div className="placeholder-content glass-panel" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '4rem auto' }}>
                    <Lock size={48} className="text-muted" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h2 className="heading-2">{e.authRequired}</h2>
                    <p className="text-muted">{e.authDesc}</p>
                    <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => setCurrentView('profile')}>{t.sidebar.profile}</button>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="eval-view animate-in centered">
                <div className="glass-panel success-panel">
                    <CheckCircle2 size={48} className="text-secondary mb-md" />
                    <h2 className="heading-2">{e.successTitle}</h2>
                    <p className="text-muted">{e.successDesc}</p>
                    <div className="mt-lg">
                        <button className="btn-primary" onClick={handleReset}>{e.evalAnother}</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="eval-view animate-in">
            <div className="eval-header glass-panel">
                <div className="eval-title-row">
                    <MessageSquare className="text-gradient" size={28} />
                    <div>
                        <h1 className="heading-1 m-0">{e.title}</h1>
                        <p className="text-muted">{e.subtitle} {course.trimester || course.term}</p>
                    </div>
                </div>

                <div className="auth-badge">
                    <Lock size={14} className="text-muted" />
                    <span>{e.moodleVerified}</span>
                </div>
            </div>

            {/* Course Selector */}
            {transcript.length > 1 && (
                <div className="eval-course-selector glass-panel">
                    <label className="text-muted text-sm" htmlFor="course-select">{e.selectCourse}</label>
                    <div className="select-wrapper">
                        <select
                            id="course-select"
                            className="course-select"
                            value={selectedCourseId || ''}
                            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                        >
                            {transcript.map(enrollment => (
                                <option key={enrollment.course.id} value={enrollment.course.id}>
                                    {enrollment.course.code} — {enrollment.course.title}{enrollment.grade ? ` · ${t.catalog.grade} ${enrollment.grade}` : ''}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>
                </div>
            )}

            <div className="eval-context-card glass-panel highlight-blue">
                <div className="eval-context-top">
                    <div>
                        <h3 className="course-code">{course.code}</h3>
                        <h2 className="course-title">{course.title}</h2>
                    </div>
                    {selectedEnrollment?.grade && (
                        <div className="eval-grade-badge">
                            <Award size={16} />
                            <span>{e.grade || t.catalog.grade} <strong>{selectedEnrollment.grade}</strong></span>
                        </div>
                    )}
                </div>
                <p className="instructor">{e.instructor} {course.instructor}</p>

                <div className="disclaimer mt-sm">
                    <AlertTriangle size={16} className="text-accent" />
                    <p className="text-sm text-muted">{e.disclaimer}</p>
                </div>
            </div>

            {error && (
                <div className="eval-error glass-panel">
                    <AlertTriangle size={18} className="text-danger" />
                    <p className="text-danger">{error}</p>
                </div>
            )}

            <form className="eval-form glass-panel" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3 className="heading-2 text-md">{e.q1Title}</h3>
                    <p className="text-muted text-sm mb-md">{e.q1Desc}</p>

                    <div className="likert-scale">
                        <span className="scale-label">{e.poor}</span>
                        {[1, 2, 3, 4, 5].map(val => (
                            <button
                                key={val}
                                type="button"
                                className={`scale-btn ${rating1 === val ? 'active' : ''}`}
                                onClick={() => setRating1(val)}
                            >
                                {val}
                            </button>
                        ))}
                        <span className="scale-label">{e.excellent}</span>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="heading-2 text-md">{e.q2Title}</h3>
                    <p className="text-muted text-sm mb-md">{e.q2Desc}</p>

                    <div className="likert-scale">
                        <span className="scale-label">{e.disagree}</span>
                        {[1, 2, 3, 4, 5].map(val => (
                            <button
                                key={val}
                                type="button"
                                className={`scale-btn ${rating2 === val ? 'active' : ''}`}
                                onClick={() => setRating2(val)}
                            >
                                {val}
                            </button>
                        ))}
                        <span className="scale-label">{e.agree}</span>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="heading-2 text-md">{e.q3Title}</h3>
                    <p className="text-muted text-sm mb-md">{e.q3Desc}</p>

                    <div className="likert-scale workload-scale">
                        <span className="scale-label">&lt; 3 год</span>
                        {[1, 2, 3, 4, 5].map(val => (
                            <button
                                key={val}
                                type="button"
                                className={`scale-btn xl ${rating3 === val ? 'active' : ''}`}
                                onClick={() => setRating3(val)}
                            >
                                {val === 1 ? '3-5г' : val === 2 ? '5-7г' : val === 3 ? '7-9г' : val === 4 ? '9-12г' : '>12г'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="heading-2 text-md">{e.q4Title}</h3>
                    <p className="text-muted text-sm mb-sm">{e.q4Desc}</p>
                    <textarea
                        className="eval-textarea"
                        placeholder={e.placeholder}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={5}
                    ></textarea>
                </div>

                <div className="form-actions border-t pt-md mt-lg">
                    <button type="button" className="btn-secondary">{e.saveDraft}</button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="spin-icon" />
                                {e.submitting}
                            </>
                        ) : (
                            e.submit
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseEvaluations;
