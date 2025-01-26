import react, { useState, useEffect, use } from 'react';
import { format, parseISO, isToday } from 'date-fns'; // Import date-fns functions to change a date into a day
import "../CSS/FiveDayForecast.css";

export default function FiveDayForecast({ getWeatherIcon, forecast }) {
    // const position = ((currentTemp - lowTemp) / (highTemp - lowTemp)) * 100; 
    useEffect(() => {
        console.log("Five Day Forecast: ", forecast);
    }, [forecast]);

    // This will take in a date "YYYY-MM-DD" and return the day of the week
    const getDayName = (dateString) => {
        const date = parseISO(dateString);
        return isToday(date) ? "Today" : format(date, 'EEEE'); // Returns "Today" or day name
    };

    return (
        <div className="five-day-forecast">
            <div className="other-cities-header">Other Cities</div>
            {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                    <p className="day-name">{getDayName(day.date)}</p> {/* Display Day Name */}
                    <img
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt={day.description}
                        className="weather-icon"
                    />
                    <p className="description">{day.description}</p>
                    <div className="weather-bar">
                        <span className="low-temp">Low: {Math.round(day.tempMin)}°</span>
                        <div className="bar">
                            {/* Placeholder for a temperature bar */}
                        </div>
                        <span className="high-temp">High: {Math.round(day.tempMax)}°</span>
                    </div>
                </div>
            ))}
        </div>

    );
}