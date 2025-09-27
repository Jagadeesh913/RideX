import React, { useState, useEffect } from 'react';

const LaunchCountdown = () => {
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const eventDate = new Date('2023-12-31T00:00:00'); // Set your event date here
        const interval = setInterval(() => {
            const now = new Date();
            const timeLeft = eventDate - now;

            if (timeLeft < 0) {
                clearInterval(interval);
                setCountdown(0);
            } else {
                setCountdown(Math.floor(timeLeft / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div>
            <h1>Countdown to Launch</h1>
            <p>{formatTime(countdown)}</p>
        </div>
    );
};

export default LaunchCountdown;