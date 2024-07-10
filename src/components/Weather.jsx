import search_img from '../assets/search.png';
import clear from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import './Weather.css';
import { useEffect, useState, useRef } from 'react';

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': cloud,
    '03n': cloud,
    '04d': drizzle,
    '04n': drizzle,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain,
    '13d': snow,
    '13n': snow,
  };

  const search = async (city) => {
    if(city === ""){
      alert("Enter city name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search('Indore');
  }, []);

  return (
    <div className='weather'>
      <div className='search'>
        <input ref={inputRef} type='text' placeholder='Search for city' />
        <img
          src={search_img}
          alt='search'
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt='clear' className='clear-icon' />
          <p className='temp'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='comps'>
              <img src={humidity} alt='humidity' />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='comps'>
              <img src={wind} alt='wind' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
