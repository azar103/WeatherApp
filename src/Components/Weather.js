import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import rain from '../assets/rain.jpg';
import sun from '../assets/sun.jpg';
import clouds from '../assets/clouds.jpg';
import night from '../assets/night.jpg';
const Weather = () => {
    const API_KEY = "48a137a1fc1122876a2e4c7e36e2840b";
  const base = 'https://api.openweathermap.org/data/2.5/';
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState('');
  const showWeather = async () => {
    let res = null;
    if (query !== "") {
       res = await axios.get(`${base}weather?q=${query}&units=metric&appid=${API_KEY}`);
    } else {
      res = await axios.get(`${base}weather?q=tunis&units=metric&appid=${API_KEY}`);
    }
    setWeather(res.data);
  }
  useEffect(() => {
    showWeather();
  }, []);
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      showWeather();
      setWeather('');
      setQuery('');
    }
  }
  const onChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  }
  const getDate = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  }

  const getBackground = (status) => {
    const currentTime = Math.floor((new Date()).getTime() / 1000);
    if (currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset) {
      if (status === 'Clear') {
        return `url(${sun})`
      } else if (status === 'Rain') {
        return `url(${rain})`
      } else if (status === 'Clouds') {
        return `url(${clouds})`;
      }
    }
    else {
      return `url(${night})`;
    }
  
  }
  if (weather) {
    return (
      <div className="weather_box"
        style={{
          backgroundImage: getBackground(weather.weather[0].main)
        }}
      >
      <div className="container">
          <input type="text" className="search"
            placeholder="search here..."
            value={query}
            onKeyPress={onKeyPress}
            onChange={onChange}
          />
          
          <main>
            <h1>{weather.name}, {weather.sys.country}</h1>
            <span className="date">{getDate(new Date())}</span>
            <div className="temperature">
              <h2>{Math.ceil(weather.main.temp)}<span>°</span></h2>
            </div>
       
            <p>{weather.weather[0].main}</p>
          </main>
       
        </div>
        <div className="details">
          <div className="grid">
          <i className='fas fa-wind icon'></i>
            <div className="description">
              <h3>wind</h3>
              <span>{weather.wind.speed} km/h</span>
            </div>
          </div>
          <div className="grid">
          <i className='fas fa-sun icon'></i>
            <div className="description">
              <h3>index UV</h3>
              <span>12,4</span>
            </div>
          </div>
          <div className="grid">
          <i className='fas fa-temperature-high icon'></i>
            <div className="description">
              <h3>Temperature</h3>
              <span>{weather.main.temp}°</span>
            </div>
          </div>
          <div className="grid">
          <i className="fas fa-tint icon"></i>
            <div className="description">
              <h3>humidity</h3>
              <span>{weather.main.humidity}%</span>
            </div>
          </div>  
         </div>
      
      </div>
    );
  } else {
    return <p
      style={{
        position: "absolute", top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)'
      }}
    >Weather Not Found</p>
}
  
}

export default Weather
