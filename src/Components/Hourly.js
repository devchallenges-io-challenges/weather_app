import react, { useState, useEffect, use } from 'react';
import "../CSS/Hourly.css";

export default function Hourly({ weatherData, getWeatherIcon }) {
    const [hourlyForecasts, setHourlyForecasts] = useState([]);

    const updateHourlyForecasts = () => {
        if (weatherData && weatherData.list && weatherData.list.length > 0) {
            setHourlyForecasts(weatherData.list.slice(0, 7));
        } else {
            console.warn("weatherData.list is not available yet", weatherData);
        }
    };

    useEffect(() => {
        const icon = getWeatherIcon(weatherData);
        console.log("Weather Icon: ", icon);
    }, []);

    // Runs when weatherData changes
    useEffect(() => {
        updateHourlyForecasts();
        console.log("Hourly Forecasts: ", hourlyForecasts);
        console.log("Icon",)
    }, [weatherData]);

    return (
        <>
            <div className='hourly-container'>
                {hourlyForecasts.length > 0 ? (
                    hourlyForecasts.map((forecast, index) => (
                        <div key={index} className='hourly-forecast'>
                            <p className='hour'>
                                {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                            </p>
                            <div className='line'></div>
                            <img
                                src={getWeatherIcon(hourlyForecasts)}
                                alt="Weather Icon"
                                className="weather-icon-hourly"
                            />
                            <p className='weather-description-hourly'>
                                {forecast.weather[0].description.charAt(0).toUpperCase() + forecast.weather[0].description.slice(1)}
                            </p>
                            <p className='temp'>{Math.round(forecast.main.temp)}°</p>
                        </div>
                    ))
                ) : (
                    <p>Loading hourly forecast...</p>
                )}
            </div>
        </>
    )
}