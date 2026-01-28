import React from 'react';
import '../home/home.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoutMode = () => {
    const navigate = useNavigate();

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    // Login State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Sign Up State
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    // Handlers
    const handleLoginClick = () => {
        setIsLoginOpen(true);
        setIsSignUpOpen(false);
        setError('');
    };

    const handleSignUpClick = () => {
        setIsSignUpOpen(true);
        setIsLoginOpen(false);
        setError('');
    };

    const handleCloseModal = () => {
        setIsLoginOpen(false);
        setIsSignUpOpen(false);
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (!signupUsername || !signupEmail || !signupPassword) {
            setError("All fields are required");
            return;
        }

        // Store user in localStorage
        const newUser = { username: signupUsername, email: signupEmail, password: signupPassword };
        // We'll store users in an array 'cv2job_users' or simply map by username for O(1) look up.
        // Let's use a simple key-value for this user: user_{username}
        localStorage.setItem(`user_${signupUsername}`, JSON.stringify(newUser));

        alert("Sign Up Successful! Please Sign In.");
        setIsSignUpOpen(false);
        setIsLoginOpen(true); // Switch to Login

        // Reset form
        setSignupUsername('');
        setSignupEmail('');
        setSignupPassword('');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Check Hardcoded
        if (
            (username === 'UJJWAL_8189' && password === 'UJJWAL_8189') ||
            (username === 'Himanshu' && password === 'Himanshu')
        ) {
            navigate('/home');
            return;
        }

        // Check LocalStorage
        const storedUserJson = localStorage.getItem(`user_${username}`);
        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            if (storedUser.password === password) {
                navigate('/home');
                return;
            }
        }

        // Failed
        setError('Please enter correct details or sign up');
    };

    return (
        <div className="home-container">
            <header className="header">
                <a href="/" className="logo">CV2<span>Job</span></a>
                <ul className="footer-links" style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                    <li><button onClick={handleLoginClick} style={{ background: 'none', border: '1px solid white', borderRadius: '4px', padding: '0.5rem 1rem', color: 'white', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>Sign In</button></li>
                    <li><button onClick={handleSignUpClick} style={{ background: 'var(--primary-green)', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', color: 'black', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>Sign Up</button></li>
                </ul>
            </header>

            {/* Hero Section (Custom for Logout Mode) */}
            <section className="hero">
                <p className="welcome-text">Resume Optimization</p>
                <h1 className="headline">
                    Elevate your job findings with AI power insights
                </h1>
                <p className="subtext">
                    Optimize your resume, get ATS ready and land your dream job faster.
                </p>

                {/* Goes to Sign In / Get Started */}
                <button className="cta-button" onClick={handleLoginClick}>
                    Get Started
                </button>
            </section>

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
                        <p>Simply drag and drop your PDF or Docx resume. Our secure system instantly prepares it for analysis.</p>
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

            {/* Example Result Section */}
            <section className="section examples">
                <h2 className="section-title">Match <span>Preview</span></h2>
                <div className="example-container">
                    <div className="mock-card">
                        <div className="mock-header">
                            <div>
                                <h3 className="job-title">Senior Frontend Engineer</h3>
                                <span className="company-name">NeuralWeb Systems • Remote</span>
                            </div>
                            <div className="match-badge">98% Match</div>
                        </div>

                        <div className="skills-list">
                            <span className="skill-tag">React</span>
                            <span className="skill-tag">TypeScript</span>
                            <span className="skill-tag">Tailwind</span>
                            <span className="skill-tag">Node.js</span>
                        </div>

                        <button className="mock-apply-btn">
                            Apply on LinkedIn
                        </button>
                    </div>
                </div>
            </section>

            {/* Trust / Value Propostion Section */}
            <section className="section trust">
                <h2 className="section-title">Why Choose <span>CV2Job</span>?</h2>
                <div className="trust-grid">
                    <div className="trust-item">
                        <div className="trust-icon">🎯</div>
                        <h3>Pinpoint Accuracy</h3>
                        <p>Our AI doesn't just match keywords; it understands the semantic context of your career history to find roles you'll actually love.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">🔒</div>
                        <h3>Privacy Friendly</h3>
                        <p>Your data is yours. We analyze your resume in real-time and never share your personal information with third parties without consent.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">⚡</div>
                        <h3>Real-Time Speed</h3>
                        <p>No waiting days for a callback. Get instant feedback and job links the moment you upload your document.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">📈</div>
                        <h3>Career Growth</h3>
                        <p>Identify skill gaps and get recommendations on how to improve your resume to target higher-paying roles.</p>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="section reviews">
                <h2 className="section-title">What Our <span>Users Say</span></h2>
                <div className="reviews-grid">
                    <div className="review-card">
                        <p className="review-text">"I was skeptical about AI resume tools, but CV2Job found me a position I wouldn't have found on my own. The match score was spot on!"</p>
                        <div className="review-author">
                            <div className="author-avatar">AM</div>
                            <div className="author-info">
                                <h4>Alex Morgan</h4>
                                <span>Software Engineer</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-card">
                        <p className="review-text">"The direct apply links saved me hours of scrolling. I applied to 5 high-quality jobs in 10 minutes and got 2 interviews."</p>
                        <div className="review-author">
                            <div className="author-avatar">SK</div>
                            <div className="author-info">
                                <h4>Sarah Klein</h4>
                                <span>Product Manager</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-card">
                        <p className="review-text">"Simple, fast, and effective. It helped me tailor my resume for the specific roles I wanted. Truly a game changer."</p>
                        <div className="review-author">
                            <div className="author-avatar">JD</div>
                            <div className="author-info">
                                <h4>James Davis</h4>
                                <span>Data Analyst</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Login Modal */}
            {isLoginOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                        <h2 className="modal-title">Sign <span>In</span></h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="login-submit-btn">Sign In</button>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                                New here? <button type="button" onClick={handleSignUpClick} style={{ color: 'var(--primary-green)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</button>
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* Sign Up Modal */}
            {isSignUpOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                        <h2 className="modal-title">Sign <span>Up</span></h2>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Username"
                                    value={signupUsername}
                                    onChange={(e) => setSignupUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Email Address"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="login-submit-btn">Create Account</button>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                                Already have an account? <button type="button" onClick={handleLoginClick} style={{ color: 'var(--primary-green)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Sign In</button>
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>About CV2Job</h3>
                        <p>CV2Job is an AI-powered platform designed to bridge the gap between talent and opportunity. We use cutting-edge technology to help you land your dream job faster.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><button onClick={handleLoginClick} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: 'pointer', textDecoration: 'none' }}>Get Started</button></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Legal & Contact</h3>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Contact Support</a></li>
                            <li><a href="#">support@cv2job.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; 2026 CV2Job. All rights reserved. Made with ❤️ for Job Seekers.
                </div>
            </footer>

        </div>
    );
};

export default LogoutMode;
