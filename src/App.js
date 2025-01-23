import react, { useState, useEffect, use } from 'react';
import './App.css';
import Nav from './Components/Nav';
import MainCard from './Components/MainCard';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = "Rockford";

  const apiKey = "d364742c2d8b7f2f0c576a34aeaca478";
  const link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const link2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
          <MainCard currentTemp={currentTemp} />
        </div>

        <div className='upper-right'>

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
