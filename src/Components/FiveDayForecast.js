import React, { useEffect } from 'react';
import { format, parseISO, isToday } from 'date-fns';
import "../CSS/FiveDayForecast.css";

export default function FiveDayForecast({ getWeatherIcon, forecast, weatherData }) {
    // useEffect(() => {
    //     console.log("Five Day Forecast: ", forecast);
    // }, [forecast]);

    // Function to get the day name or "Today"
    const getDayName = (dateString) => {
        const date = parseISO(dateString);
        return isToday(date) ? "Today" : format(date, 'EEE'); // Returns "Today" or full day name
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return ""; // Handle empty or undefined text
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div className="five-day-forecast">
            <h3 className="forecast-header">5-Day Forecast</h3>
            {forecast.map((day, index) => {
                // Calculate the position and width of the blue bar
                const barStart = ((day.tempMin + 10) / 50) * 100; // Offset for positioning
                const barWidth = ((day.tempMax - day.tempMin) / 50) * 100; // Adjust width to fit scale

                return (
                    <div key={index} className="forecast-row">
                        <div className="forecast-info">
                            <p className="day-name">{getDayName(day.date)}</p>
                            <img
                                src={getWeatherIcon({ weather: [{ main: day.main, icon: day.icon }] })}
                                alt={day.description}
                                className="weather-icon"
                            />
                            <p className="description">{capitalizeFirstLetter(day.description)}</p>
                        </div>

                        {/* Temperature Range Bar */}
                        <div className="temperature-bar">
                            <span className="low-temp">{Math.round(day.tempMin)}°</span>
                            <div className="bar">
                                <div
                                    className="temp-range"
                                    style={{ left: `${barStart}%`, width: `${barWidth}%` }}
                                ></div>
                            </div>
                            <span className="high-temp">{Math.round(day.tempMax)}°</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
