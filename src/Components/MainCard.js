import react, { useState, useEffect, use } from 'react';
import "../CSS/MainCard.css";
import wind from "../Assets/wind.png";

export default function MainCard({ currentTemp, getWeatherIcon }) {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let amPm = hours >= 12 ? 'PM' : 'AM';

            // Convert 24-hour format to 12-hour format
            hours = hours % 12 || 12; // Convert 0 (midnight) to 12

            // Format time without leading zero in hours but ensuring minutes are always two digits
            let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}`;

            setCurrentTime(formattedTime);
        };

        updateTime(); // Call immediately on component mount
        const interval = setInterval(updateTime, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const capitalizeFirstLetter = (text) => {
        if (!text) return ""; // Handle empty or undefined text
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

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

                    <div className='second-row'>
                        <div className='weather-type'>
                            <div className='weather-icon'>
                                <img src={getWeatherIcon(currentTemp)} alt='Weather icon' />
                            </div>
                            <div className='weather-description'>
                                {capitalizeFirstLetter(currentTemp.weather[0].description)}
                            </div>
                        </div>

                        <div className='wind-speed'>
                            <div className='wind-speed-icon'>
                                <img src={wind} alt='Wind speed icon' />
                            </div>
                            <div className='wind-speed-value'>{currentTemp.wind.speed} m/s</div>
                        </div>
                    </div>

                    <div className='third-row'>
                        <div className='feels-like'>
                            <div className='feels-like-label'>Feels like: </div>
                            <div className='feels-like-value'>{Math.round(currentTemp.main.feels_like)}°</div>
                        </div>

                        <div className='high-low'>
                            <div className='high-low-value'>
                                {Math.round(currentTemp.main.temp_max)}° to {Math.round(currentTemp.main.temp_min)}°
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}