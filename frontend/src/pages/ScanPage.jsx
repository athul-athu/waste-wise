import React, { useState, useRef } from 'react';
import styles from './ScanPage.module.css';
import { FaCamera, FaUpload, FaSpinner, FaRecycle } from 'react-icons/fa';

function ScanPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setIsCameraActive(true);
      setError(null);
    } catch (err) {
      setError('Unable to access camera. Please check your permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create a canvas to capture the image
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);

      // Convert to blob and simulate API call
      canvas.toBlob(async (blob) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate response
        setResult({
          type: 'Plastic Bottle',
          category: 'Recyclable',
          instructions: 'Please rinse and remove the cap before recycling',
          confidence: '95%'
        });
        
        setIsLoading(false);
        stopCamera();
      }, 'image/jpeg');
    } catch (err) {
      setError('Failed to process image. Please try again.');
      setIsLoading(false);
      console.error('Image processing error:', err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setResult({
        type: 'Paper',
        category: 'Recyclable',
        instructions: 'Please flatten and remove any non-paper components',
        confidence: '92%'
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaRecycle className={styles.headerIcon} />
        <h1 className={styles.title}>Scan Waste</h1>
      </div>

      <div className={styles.scanContainer}>
        {!isCameraActive && !isLoading && !result && (
          <div className={styles.initialOptions}>
            <button className={styles.button} onClick={startCamera}>
              <FaCamera className={styles.buttonIcon} />
              Use Camera
            </button>
            <label className={styles.button}>
              <FaUpload className={styles.buttonIcon} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className={styles.fileInput}
              />
            </label>
          </div>
        )}

        {isCameraActive && !isLoading && !result && (
          <div className={styles.cameraContainer}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={styles.video}
            />
            <button className={styles.captureButton} onClick={captureImage}>
              Capture
            </button>
          </div>
        )}

        {isLoading && (
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} />
            <p>Analyzing waste...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.error}>{error}</p>
            <button className={styles.retryButton} onClick={() => setError(null)}>
              Try Again
            </button>
          </div>
        )}

        {result && (
          <div className={styles.resultContainer}>
            <h2 className={styles.resultTitle}>Analysis Result</h2>
            <div className={styles.resultCard}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Type:</span>
                <span className={styles.resultValue}>{result.type}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Category:</span>
                <span className={styles.resultValue}>{result.category}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Instructions:</span>
                <span className={styles.resultValue}>{result.instructions}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Confidence:</span>
                <span className={styles.resultValue}>{result.confidence}</span>
              </div>
            </div>
            <button
              className={styles.newScanButton}
              onClick={() => {
                setResult(null);
                setIsLoading(false);
              }}
            >
              Scan Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanPage; 