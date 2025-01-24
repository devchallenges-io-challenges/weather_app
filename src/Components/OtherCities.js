import React, { useState, useEffect } from "react";
import "../CSS/OtherCities.css";

export default function OtherCities({ currentTemp }) {
    const [unit, setUnit] = useState("imperial");
    const [city, setCity] = useState([]);
    const apiKey = "d364742c2d8b7f2f0c576a34aeaca478";
    const currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;


    return (
        <>
            <div className="other-cities-header">Other Cities</div>
            <section className='other-cities-container'>
                <div className='other-city'>
                    <div className='city-name'>New York</div>
                    <div className='city-temp'>{Math.round(currentTemp.main.temp)}°</div>
                </div>
                <div className='other-city'>
                    <div className='city-name'>Los Angeles</div>
                    <div className='city-temp'>{Math.round(currentTemp.main.temp)}°</div>
                </div>
                <div className='other-city'>
                    <div className='city-name'>Chicago</div>
                    <div className='city-temp'>{Math.round(currentTemp.main.temp)}°</div>
                </div>
            </section>
        </>
    )
}