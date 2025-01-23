import react, { useState, useEffect, use } from 'react';
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
import wind from "./Assets/wind.png";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = "Rockford";

  const apiKey = "d364742c2d8b7f2f0c576a34aeaca478";
  const link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const link2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Function to get the correct weather icon based on API response
  const getWeatherIcon = (weatherData) => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return defaultIcon; // Return default icon if no data
    }

    const weatherMain = weatherData.weather[0].main.toLowerCase(); // Extract "Clouds", "Rain", etc.

    // Map weather conditions to icons
    const iconMap = {
      clear: clear,
      clouds: cloudy,
      rain: rain,
      snow: snow,
      thunderstorm: thunderstorm,
      drizzle: rain,
    };

    return iconMap[weatherMain] || defaultIcon; // Return matching icon or default
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} `);
        }
        const data = await response.json();
        console.log("Data: ", data);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(link2);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} `);
        }
        const data = await response.json();
        console.log("Data: ", data);
        setCurrentTemp(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <section className='upper'>
        <div className='upper-left'>
          <MainCard currentTemp={currentTemp} getWeatherIcon={getWeatherIcon} />
        </div>

        <div className='upper-right'>
          <Hourly weatherData={weatherData} />
        </div>
      </section>

      <section className='lower'>
        <div className='lower-left'>

        </div>

        <div className='lower-right'>

        </div>
      </section>
    </div>
  );
}

export default App;
