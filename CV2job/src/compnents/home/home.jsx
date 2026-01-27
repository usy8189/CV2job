import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <a href="/" className="logo">CV2<span>Job</span></a>
            </header>

            <main className="hero">
                <p className="welcome-text">Welcome to CV2Job</p>
                <h1 className="headline">
                    Upload your resume and get instant LinkedIn job matches
                </h1>
                <p className="subtext">
                    AI analyzes your resume and finds relevant jobs with direct apply links.
                </p>

                <button className="cta-button" onClick={() => alert("Upload feature coming soon!")}>
                    Upload Resume
                </button>
            </main>
        </div>
    );
};

export default Home;
