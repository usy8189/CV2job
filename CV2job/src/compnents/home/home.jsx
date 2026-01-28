import React, { useState, useRef } from 'react';
import './home.css';
import DragDropModal from '../drag_drop_modal/DragDropModal';

const Home = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const rolesRef = useRef(null);

    const handleAnalysisComplete = (analysis) => {
        setAnalysisResult(analysis);
        // Scroll to roles section
        setTimeout(() => {
            rolesRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleFindJobs = (roleTitle) => {
        // For now, just alert - later integrate with job search
        alert(`Searching jobs for: ${roleTitle}`);
    };

    return (
        <div className="home-container">
            <header className="header">
                <a href="/" className="logo">CV2<span>Job</span></a>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <p className="welcome-text">Welcome to CV2Job</p>
                <h1 className="headline">
                    Upload your resume and get instant LinkedIn job matches
                </h1>
                <p className="subtext">
                    AI analyzes your resume and finds relevant jobs with direct apply links.
                    Stop searching, start applying.
                </p>

                <button className="cta-button" onClick={() => setIsUploadOpen(true)}>
                    Upload Resume
                </button>
            </section>

            {/* Role Cards Section - Shows after analysis */}
            {analysisResult && analysisResult.suggestedRoles && (
                <section className="section roles-section" ref={rolesRef}>
                    <h2 className="section-title">Your Best <span>Matches</span></h2>
                    <p className="roles-subtitle">Based on your resume, here are the top 5 roles that match your profile</p>

                    <div className="roles-grid">
                        {analysisResult.suggestedRoles.map((role, index) => (
                            <div className="role-card" key={index}>
                                <div className="role-card-header">
                                    <span className="role-rank">#{index + 1}</span>
                                    <span className="role-match">{role.matchScore}% Match</span>
                                </div>
                                <h3 className="role-title">{role.title}</h3>
                                <div className="role-skills">
                                    {analysisResult.skills?.slice(0, 3).map((skill, i) => (
                                        <span className="role-skill-tag" key={i}>{skill}</span>
                                    ))}
                                </div>
                                <button
                                    className="find-jobs-btn"
                                    onClick={() => handleFindJobs(role.title)}
                                >
                                    Find Jobs →
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Experience & Summary Card */}
                    <div className="analysis-summary">
                        <div className="summary-item">
                            <span className="summary-label">Experience Level</span>
                            <span className="summary-value">{analysisResult.experienceLevel}</span>
                        </div>
                        <div className="summary-item summary-text">
                            <span className="summary-label">Profile Summary</span>
                            <p className="summary-value">{analysisResult.summary}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section className="section features">
                <h2 className="section-title">Powerful <span>Features</span></h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Resume Parsing</h3>
                        <p>Our advanced AI algorithms instantly break down your resume to understand your unique professional profile, structure, and history.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Skill & Role Detection</h3>
                        <p>We identify your core technical and soft skills, mapping them to industry standards to find the perfect role that fits your expertise.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Job Relevance Score</h3>
                        <p>Stop guessing. Our smart scoring system ranks every job opportunity based on how well it matches your specific qualifications.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Direct Apply Links</h3>
                        <p>Save time with direct access to LinkedIn application pages. One click is all it takes to put your resume in front of recruiters.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Advanced Filters</h3>
                        <p>Refine your search with precision filters for Location, Remote work, Salary expectations, and Experience levels.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section how-it-works">
                <h2 className="section-title">How It <span>Works</span></h2>
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Upload Resume</h3>
                        <p>Simply drag and drop your PDF resume. Our secure system instantly prepares it for analysis.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>AI Analysis</h3>
                        <p>Our intelligent engine scans your profile, extracting key skills, experience, and role preferences.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Get Matches</h3>
                        <p>Receive a tailored list of high-percentage matches from LinkedIn and apply with confidence.</p>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="section trust">
                <h2 className="section-title">Why Trust <span>CV2Job</span></h2>
                <div className="trust-grid">
                    <div className="trust-item">
                        <div className="trust-icon">🔒</div>
                        <h3>100% Secure</h3>
                        <p>Your resume data is encrypted and never stored. We value your privacy above all else.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Get job matches in seconds, not hours. Our AI works at incredible speed.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">🎯</div>
                        <h3>High Accuracy</h3>
                        <p>Our matching algorithm has a 95%+ satisfaction rate from users who found their dream job.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>CV2Job</h3>
                        <p>AI-powered job matching that understands your potential. Built for job seekers who want to succeed.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Legal</h3>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 CV2Job. All rights reserved.</p>
                </div>
            </footer>

            {/* Upload Modal */}
            {isUploadOpen && (
                <DragDropModal
                    onClose={() => setIsUploadOpen(false)}
                    onAnalysisComplete={handleAnalysisComplete}
                />
            )}
        </div>
    );
};

export default Home;
