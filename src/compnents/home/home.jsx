import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import DragDropModal from '../drag_drop_modal/DragDropModal';

const Home = () => {
    const navigate = useNavigate();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [jobResults, setJobResults] = useState(null);
    const [isLoadingJobs, setIsLoadingJobs] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const rolesRef = useRef(null);
    const jobsRef = useRef(null);

    // Load current user on mount
    useEffect(() => {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        } else {
            // Not logged in, redirect to login
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const handleAnalysisComplete = (analysis) => {
        setAnalysisResult(analysis);
        setJobResults(null);
        setSelectedRole(null);
        setTimeout(() => {
            rolesRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleFindJobs = async (roleTitle) => {
        setSelectedRole(roleTitle);
        setIsLoadingJobs(true);
        setJobResults(null);

        try {
            const response = await fetch('http://localhost:5000/api/search-jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: roleTitle,
                    location: 'India'
                }),
            });

            const data = await response.json();

            if (data.success) {
                setJobResults(data.jobs);
                setTimeout(() => {
                    jobsRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                alert("Failed to fetch jobs: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Job search error:", error);
            alert("Error fetching jobs. Please try again.");
        } finally {
            setIsLoadingJobs(false);
        }
    };

    return (
        <div className="home-container">
            <header className="header">
                <a href="/" className="logo">CV2<span>Job</span></a>

                {/* Profile Section */}
                <div className="profile-wrapper">
                    <button
                        className="profile-button"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className="profile-avatar">
                            {currentUser?.username?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="profile-greeting">
                            Hey, {currentUser?.username || 'User'}!
                        </span>
                        <span className="profile-arrow">{isProfileOpen ? '▲' : '▼'}</span>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-header">
                                <div className="profile-avatar-large">
                                    {currentUser?.username?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="profile-info">
                                    <h3>{currentUser?.username}</h3>
                                    <p>{currentUser?.email}</p>
                                </div>
                            </div>
                            <div className="profile-divider"></div>
                            <ul className="profile-menu">
                                <li onClick={() => setShowComingSoon(true)}>
                                    <span className="profile-menu-icon">👤</span>
                                    My Profile
                                </li>
                                <li onClick={() => setShowComingSoon(true)}>
                                    <span className="profile-menu-icon">⚙️</span>
                                    Settings
                                </li>
                            </ul>
                            <div className="profile-divider"></div>
                            <button className="logout-btn" onClick={handleLogout}>
                                <span className="profile-menu-icon">🚪</span>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <p className="welcome-text">Welcome back, {currentUser?.username}!</p>
                <h1 className="headline">
                    Upload your resume and get instant job matches
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
                            <div className={`role-card ${selectedRole === role.title ? 'selected' : ''}`} key={index}>
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
                                    className={`find-jobs-btn ${isLoadingJobs && selectedRole === role.title ? 'loading' : ''}`}
                                    onClick={() => handleFindJobs(role.title)}
                                    disabled={isLoadingJobs}
                                >
                                    {isLoadingJobs && selectedRole === role.title ? (
                                        <>
                                            <span className="spinner"></span>
                                            Searching...
                                        </>
                                    ) : (
                                        'Find Jobs →'
                                    )}
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

            {/* Job Results Section */}
            {jobResults && jobResults.length > 0 && (
                <section className="section jobs-section" ref={jobsRef}>
                    <h2 className="section-title">
                        Jobs for <span>{selectedRole}</span>
                    </h2>
                    <p className="jobs-subtitle">Found {jobResults.length} matching positions</p>

                    <div className="jobs-grid">
                        {jobResults.map((job, index) => (
                            <div className="job-card" key={job.id || index}>
                                <div className="job-card-header">
                                    <div className="job-company-logo">
                                        {job.company?.charAt(0) || '?'}
                                    </div>
                                    <div className="job-header-info">
                                        <h3 className="job-card-title">{job.title}</h3>
                                        <p className="job-company">{job.company}</p>
                                    </div>
                                </div>

                                <div className="job-details">
                                    <div className="job-detail">
                                        <span className="job-detail-icon">📍</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="job-detail">
                                        <span className="job-detail-icon">💼</span>
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="job-detail">
                                        <span className="job-detail-icon">💰</span>
                                        <span>{job.salary}</span>
                                    </div>
                                </div>

                                <a
                                    href={job.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="apply-btn"
                                >
                                    Apply on {job.source || 'Website'}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section className="section features">
                <h2 className="section-title">Powerful <span>Features</span></h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Resume Parsing</h3>
                        <p>Our advanced AI algorithms instantly break down your resume to understand your unique professional profile.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Skill & Role Detection</h3>
                        <p>We identify your core technical and soft skills, mapping them to find the perfect role.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Job Relevance Score</h3>
                        <p>Our smart scoring system ranks every job based on how well it matches your qualifications.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Direct Apply Links</h3>
                        <p>One click to apply on LinkedIn. Put your resume in front of recruiters instantly.</p>
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
                        <p>Drag and drop your PDF resume for instant analysis.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>AI Analysis</h3>
                        <p>Our AI extracts skills and recommends best-fit roles.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Get Matches</h3>
                        <p>Browse real job listings and apply with one click.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>CV2Job</h3>
                        <p>AI-powered job matching built for job seekers who want to succeed. Your dream job is just one upload away.</p>
                    </div>

                    <div className="footer-column">
                        <h3>Developers</h3>
                        <div className="developer-card">
                            <div className="developer-avatar">H</div>
                            <div className="developer-info">
                                <span className="developer-name">Himanshu</span>
                                <div className="developer-links">
                                    <a href="https://www.linkedin.com/in/himanxhu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <a href="https://github.com/Dexter-2005" target="_blank" rel="noopener noreferrer">GitHub</a>
                                    <a href="https://www.instagram.com/himanxhu_chaudhary" target="_blank" rel="noopener noreferrer">Instagram</a>
                                </div>
                            </div>
                        </div>
                        <div className="developer-card">
                            <div className="developer-avatar">U</div>
                            <div className="developer-info">
                                <span className="developer-name">Ujjwal</span>
                                <div className="developer-links">
                                    <a href="https://www.linkedin.com/in/ujjwalsinghyadav" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <a href="https://github.com/usy8189" target="_blank" rel="noopener noreferrer">GitHub</a>
                                    <a href="https://www.instagram.com/ujjwal_8189" target="_blank" rel="noopener noreferrer">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3>Legal</h3>
                        <ul className="footer-links">
                            <li><button className="legal-link" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button></li>
                            <li><button className="legal-link" onClick={() => setShowTermsModal(true)}>Terms of Service</button></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Contact Support</h3>
                        <ul className="footer-links">
                            <li>📧 24uec253@lnmiit.ac.in</li>
                            <li>📧 24uec250@lnmiit.ac.in</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 CV2Job. All rights reserved. Made with ❤️ by Himanshu & Ujjwal</p>
                </div>
            </footer>

            {/* Upload Modal */}
            {isUploadOpen && (
                <DragDropModal
                    onClose={() => setIsUploadOpen(false)}
                    onAnalysisComplete={handleAnalysisComplete}
                />
            )}

            {/* Privacy Policy Modal */}
            {showPrivacyModal && (
                <div className="legal-modal-overlay" onClick={() => setShowPrivacyModal(false)}>
                    <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowPrivacyModal(false)}>&times;</button>
                        <h2 className="legal-modal-title">Privacy <span>Policy</span></h2>
                        <div className="legal-modal-content">
                            <p><strong>Last Updated:</strong> January 2026</p>
                            <h3>1. Information We Collect</h3>
                            <p>We collect information you provide directly, including your resume content for analysis purposes. We do not store your resume permanently.</p>
                            <h3>2. How We Use Your Information</h3>
                            <p>Your resume data is processed in real-time by our AI system to provide job recommendations. We do not sell or share your personal information with third parties.</p>
                            <h3>3. Data Security</h3>
                            <p>We implement industry-standard security measures to protect your information. Resume data is encrypted during transmission and is not stored after analysis.</p>
                            <h3>4. Your Rights</h3>
                            <p>You have the right to access, correct, or delete your personal information. Contact us at the provided email addresses for any privacy concerns.</p>
                            <h3>5. Contact Us</h3>
                            <p>For privacy-related inquiries, email us at 24uec253@lnmiit.ac.in or 24uec250@lnmiit.ac.in</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Terms of Service Modal */}
            {showTermsModal && (
                <div className="legal-modal-overlay" onClick={() => setShowTermsModal(false)}>
                    <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowTermsModal(false)}>&times;</button>
                        <h2 className="legal-modal-title">Terms of <span>Service</span></h2>
                        <div className="legal-modal-content">
                            <p><strong>Last Updated:</strong> January 2026</p>
                            <h3>1. Acceptance of Terms</h3>
                            <p>By accessing and using CV2Job, you accept and agree to be bound by these Terms of Service.</p>
                            <h3>2. Use of Service</h3>
                            <p>CV2Job provides AI-powered resume analysis and job matching services. You agree to use this service for lawful purposes only.</p>
                            <h3>3. User Responsibilities</h3>
                            <p>You are responsible for the accuracy of the information you provide. Do not upload resumes containing false or misleading information.</p>
                            <h3>4. Intellectual Property</h3>
                            <p>All content, features, and functionality of CV2Job are owned by the developers and are protected by intellectual property laws.</p>
                            <h3>5. Limitation of Liability</h3>
                            <p>CV2Job is provided "as is" without warranties. We are not responsible for job application outcomes or third-party website content.</p>
                            <h3>6. Changes to Terms</h3>
                            <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Coming Soon Modal */}
            {showComingSoon && (
                <div className="legal-modal-overlay" onClick={() => setShowComingSoon(false)}>
                    <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="coming-soon-icon">🚀</div>
                        <h2>Coming <span>Soon!</span></h2>
                        <p>This feature is currently under development. Stay tuned for updates!</p>
                        <button className="coming-soon-btn" onClick={() => setShowComingSoon(false)}>Got it!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
