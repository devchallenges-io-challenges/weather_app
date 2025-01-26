import react, { useState, useEffect, use } from 'react';
import "../CSS/Hourly.css";

export default function Hourly({ weatherData, getWeatherIcon }) {
    const [hourlyForecasts, setHourlyForecasts] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateHourlyForecasts = () => {
        if (weatherData && weatherData.list && weatherData.list.length > 0) {
            setHourlyForecasts(weatherData.list.slice(0, 7));
        } else {
            console.warn("weatherData.list is not available yet", weatherData);
        }
    };

    // useEffect(() => {
    //     const icon = getWeatherIcon(weatherData);
    //     console.log("Weather Icon: ", icon);
    // }, []);

    // Runs when weatherData changes
    useEffect(() => {
        updateHourlyForecasts();
        // console.log("Hourly Forecasts: ", hourlyForecasts);
    }, [weatherData]);

    return (
        <>
            <div className='hourly-container'>
                {hourlyForecasts.length > 0 ? (
                    hourlyForecasts.map((forecast, index) => {
                        // Ensure forecast and weather data exist before accessing properties
                        const weatherInfo = forecast.weather && forecast.weather.length > 0 ? forecast.weather[0] : null;
                        const weatherIcon = weatherInfo ? getWeatherIcon(forecast) : null;
                        return (
                            <div key={index} className='hourly-forecast'>
                                <p className='hour'>
                                    {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </p>
                                <div className='line'></div>

                                {/* Safely Render Icon */}
                                {weatherIcon && (
                                    <img
                                        src={weatherIcon}
                                        alt="Weather Icon"
                                        className="weather-icon-hourly"
                                    />
                                )}

                                {/* Ensure Weather Description is Available */}
                                {weatherInfo && (
                                    <p className='weather-description-hourly'>
                                        {weatherInfo.description.charAt(0).toUpperCase() + weatherInfo.description.slice(1)}
                                    </p>
                                )}

                                <p className='temp'>{Math.round(forecast.main.temp)}°</p>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading hourly forecast...</p>
                )}
            </div>
        </>
    )
}