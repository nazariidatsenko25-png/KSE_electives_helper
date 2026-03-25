import React from 'react';

const InstructorProfile = ({ courseId, onBack }) => {
    return (
        <div className="profile-view animate-in centered">
            <div className="glass-panel text-center" style={{ padding: '3rem' }}>
                <h2 className="heading-2">Instructor Profile (Course: {courseId})</h2>
                <p className="text-muted">This page is under construction.</p>
                <button className="btn-primary mt-md" onClick={onBack}>Back</button>
            </div>
        </div>
    );
};

export default InstructorProfile;
