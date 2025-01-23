import react, { useState, useEffect, use } from 'react';
import "../CSS/MainCard.css";

export default function MainCard({ currentTemp }) {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            setCurrentTime(formattedTime);
        };

        updateTime(); // Set initial time
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    return (
        <>
            <div className='main-card'>
                <div className='main-card-container'>
                    <div className='top-row'>
                        <div className='current-temp'>{Math.round(currentTemp.main.temp)}°</div>
                        <div className='city-time'>
                            <div className='city'>{currentTemp.name}</div>
                            <div className='time'>{currentTime}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}