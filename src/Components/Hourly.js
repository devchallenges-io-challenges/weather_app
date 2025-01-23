import react, { useState, useEffect, use } from 'react';
import "../CSS/Hourly.css";

export default function Hourly({ weatherData }) {
    const [hourlyForecasts, setHourlyForecasts] = useState([]);

    const updateHourlyForecasts = () => {
        if (weatherData && weatherData.list && weatherData.list.length > 0) {
            setHourlyForecasts(weatherData.list.slice(0, 7));
        } else {
            console.warn("weatherData.list is not available yet", weatherData);
        }
    };

    // Runs when weatherData changes
    useEffect(() => {
        updateHourlyForecasts();
        console.log("Hourly Forecasts: ", hourlyForecasts);
    }, [weatherData]);

    return (
        <>

        </>
    )
}