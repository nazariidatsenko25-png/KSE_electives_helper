import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, MessageSquare, Lock } from 'lucide-react';

const CourseEvaluations = () => {
    const [submitted, setSubmitted] = useState(false);
    const [rating1, setRating1] = useState(3);
    const [rating2, setRating2] = useState(3);
    const [rating3, setRating3] = useState(3);
    const [comments, setComments] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setSubmitted(true), 600);
    };

    const course = {
        code: 'CS301',
        title: 'Операційні системи',
        instructor: 'Д-р Алан Тюрінг',
        term: 'Весна 2026'
    };

    if (submitted) {
        return (
            <div className="eval-view animate-in centered">
                <div className="glass-panel success-panel">
                    <CheckCircle2 size={48} className="text-secondary mb-md" />
                    <h2 className="heading-2">Оцінку Надіслано</h2>
                    <p className="text-muted">Дякуємо за ваш відгук! Ваша відповідь була анонімізована та записана до верифікованої бази даних.</p>
                    <div className="mt-lg">
                        <button className="btn-primary" onClick={() => setSubmitted(false)}>Оцінити інший курс</button>
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
                        <h1 className="heading-1 m-0">Верифіковане оцінювання курсу</h1>
                        <p className="text-muted">Анонімізований відгук за {course.term}</p>
                    </div>
                </div>

                <div className="auth-badge">
                    <Lock size={14} className="text-muted" />
                    <span>Проходження Moodle верифіковано</span>
                </div>
            </div>

            <div className="eval-context-card glass-panel highlight-blue">
                <h3 className="course-code">{course.code}</h3>
                <h2 className="course-title">{course.title}</h2>
                <p className="instructor">Викладач: {course.instructor}</p>

                <div className="disclaimer mt-sm">
                    <AlertTriangle size={16} className="text-accent" />
                    <p className="text-sm text-muted">Відповіді повністю деідентифікуються перед тим, як ними поділяться з викладачами. Конструктивна критика допомагає покращувати програми KSE.</p>
                </div>
            </div>

            <form className="eval-form glass-panel" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3 className="heading-2 text-md">1. Якість викладання та Зрозумілість</h3>
                    <p className="text-muted text-sm mb-md">Наскільки ефективно викладач пояснював складні концепції та сприяв проведенню занять у форматі flipped classroom?</p>

                    <div className="likert-scale">
                        <span className="scale-label">Погано</span>
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
                        <span className="scale-label">Відмінно</span>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="heading-2 text-md">2. Струкура курсу та Силабус</h3>
                    <p className="text-muted text-sm mb-md">Чи відповідали система оцінювання та завдання вказаним цілям навчання?</p>

                    <div className="likert-scale">
                        <span className="scale-label">Зовсім не згоден</span>
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
                        <span className="scale-label">Повністю згоден</span>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="heading-2 text-md">3. Академічне навантаження</h3>
                    <p className="text-muted text-sm mb-md">Очікувані vs. фактичні години витрачені на самостійне вивчення та домашні завдання на тиждень.</p>

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
                    <h3 className="heading-2 text-md">4. Відкритий відгук (Необов'язково)</h3>
                    <p className="text-muted text-sm mb-sm">Що мають знати майбутні студенти перед початком цього курсу? Які аспекти можна б було покращити?</p>
                    <textarea
                        className="eval-textarea"
                        placeholder="Поділіться своїми детальними думками тут..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={5}
                    ></textarea>
                </div>

                <div className="form-actions border-t pt-md mt-lg">
                    <button type="button" className="btn-secondary">Зберегти чернетку</button>
                    <button type="submit" className="btn-primary">Відправити оцінювання</button>
                </div>
            </form>
        </div>
    );
};

export default CourseEvaluations;
