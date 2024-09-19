"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "../styles.module.css"

// Define the structure of the weather data
interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string; // Make sure to include icon property
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "acd490248ea3d26528256c6ef6224f08"; // Insert the API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Add units=metric to get temperature in °C

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data); // Log the data for debugging
      setWeatherData(response.data);
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError("City not found or API error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather Widget</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Enter Your City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {loading ? "Loading..." : "GET WEATHER DATA"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {weatherData && (
        <div className={styles.weatherCard}>
          <h2>{weatherData.name}</h2>
          <div id="imagebox">
          <img 
            src={`https://openweathermap.org/img/wn/10d@2x.png`} 
            alt={weatherData.weather[0].description}
            className={styles.weatherImage}
          
          />
          </div>
          
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
