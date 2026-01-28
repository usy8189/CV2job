import React, { useState, useRef } from 'react';
import './DragDropModal.css';

const DragDropModal = ({ onClose, onAnalysisComplete }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const onButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFiles = async (files) => {
        const file = files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert("Please upload a PDF file.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://localhost:5000/api/analyze-resume', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                console.log("Analysis Result:", data.analysis);
                // Pass analysis to parent component
                if (onAnalysisComplete) {
                    onAnalysisComplete(data.analysis);
                }
                onClose();
            } else {
                alert("Analysis failed: " + data.error);
            }

        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading file. Make sure the backend server is running.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="drag-drop-overlay" onClick={onClose}>
            <div className="drag-drop-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h2>Upload <span>Resume</span></h2>
                    <p>Drag & drop or click to upload</p>
                </div>

                <div
                    className={`drop-zone ${isDragActive ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={!isLoading ? onButtonClick : null}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="file-input"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                        accept=".pdf"
                    />
                    <div className="drop-zone-icon">
                        {isLoading ? '⏳' : (isDragActive ? '📂' : '☁️')}
                    </div>
                    <p className="drop-zone-text">
                        {isLoading ? "Analyzing your resume..." : (isDragActive ? "Drop it here!" : "Select a PDF file")}
                    </p>
                    <p className="drop-zone-subtext">
                        {isLoading ? "This may take a few seconds" : "Supported: PDF only"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DragDropModal;
