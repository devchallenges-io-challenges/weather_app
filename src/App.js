import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Components/Nav';
import MainCard from './Components/MainCard';
import Hourly from './Components/Hourly';

import clear from "./Assets/clear.png";
import cloudy from "./Assets/cloudy.png";
import rain from "./Assets/rain.png";
import snow from "./Assets/snow.png";
import thunderstorm from "./Assets/thunderstorm.png";
import defaultIcon from "./Assets/default.png";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tempChoice, setTempChoice] = useState("F"); // Default Fahrenheit
  const [unit, setUnit] = useState("imperial"); // Default API unit

  const city = "Rockford";
  const apiKey = "d364742c2d8b7f2f0c576a34aeaca478";

  // Update API unit based on tempChoice
  useEffect(() => {
    const newUnit = tempChoice === "F" ? "imperial" : "metric";
    setUnit(newUnit);
  }, [tempChoice]);

  // API Links (update dynamically based on `unit`)
  const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  const currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  // Function to get the correct weather icon
  const getWeatherIcon = (weatherData) => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return defaultIcon;
    }

    const weatherMain = weatherData.weather[0].main.toLowerCase();
    const iconMap = {
      clear: clear,
      clouds: cloudy,
      rain: rain,
      snow: snow,
      thunderstorm: thunderstorm,
      drizzle: rain,
    };

    return iconMap[weatherMain] || defaultIcon;
  };

  // Fetch Weather Forecast Data
  useEffect(() => {
    if (!unit) return; // Prevent running before unit is set
    setLoading(true);
    const fetchForecast = async () => {
      try {
        const response = await fetch(forecastLink);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Weather Forecast Data: ", data);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [unit]); // ✅ Runs when `unit` changes

  // Fetch Current Weather Data
  useEffect(() => {
    if (!unit) return; // Prevent running before unit is set
    setLoading(true);
    const fetchCurrentWeather = async () => {
      try {
        const response = await fetch(currentWeatherLink);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Current Weather Data: ", data);
        setCurrentTemp(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentWeather();
  }, [unit]); // ✅ Runs when `unit` changes

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <nav>
        <Nav tempChoice={tempChoice} setTempChoice={setTempChoice} />
      </nav>
      <section className='upper'>
        <div className='upper-left'>
          <MainCard currentTemp={currentTemp} getWeatherIcon={getWeatherIcon} tempChoice={tempChoice} />
        </div>
        <div className='upper-right'>
          <Hourly weatherData={weatherData} tempChoice={tempChoice} />
        </div>
      </section>
    </div>
  );
}

export default App;
