import React, { useState, useEffect } from 'react';

function LaunchCountdown({ releaseDate }) {
    const targetTime = new Date(releaseDate).getTime();

    const [timeLeft, setTimeLeft] = useState(
        targetTime - new Date().getTime()
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(targetTime - new Date().getTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const formatTime = (time) => String(time).padStart(2, '0');

    if (timeLeft < 0) {
        return <p style={{ color: '#1a9f5d', fontWeight: 'bold' }}>LAUNCHED!</p>;
    }

    const timerStyle = {
        display: 'flex', justifyContent: 'center', gap: '10px',
        fontSize: '1.2rem', margin: '15px 0', border: '1px solid #ddd', 
        padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9'
    };
    const timeSegmentStyle = {
        textAlign: 'center', lineHeight: '1.2'
    };
    const labelStyle = {
        fontSize: '0.7rem', color: '#888', display: 'block'
    };

    return (
        <div style={timerStyle}>
            <div style={timeSegmentStyle}>
                {formatTime(days)} <span style={labelStyle}>D</span>
            </div>
            <div style={timeSegmentStyle}>
                {formatTime(hours)} <span style={labelStyle}>H</span>
            </div>
            <div style={timeSegmentStyle}>
                {formatTime(minutes)} <span style={labelStyle}>M</span>
            </div>
            <div style={timeSegmentStyle}>
                {formatTime(seconds)} <span style={labelStyle}>S</span>
            </div>
        </div>
    );
}

export default LaunchCountdown;