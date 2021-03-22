import React, { useState } from "react";
import "./App.css";

const apiKey = "11146cb8c492d7f53b91f62c32958f0a";
const baseURL = "https://api.openweathermap.org/data/2.5/";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${baseURL}weather?q=${query}&units=metric&APPID=${apiKey}`)
        .then((res) => res.json())
        .then((result) => setWeather(result));
      console.log(weather);
      setQuery("");
    }
  };

  return (
    <div className={`${weather?.main?.temp > 18 ? "app warm" : "app"} app`}>
      <div className="main">
        <div className="search_box">
          <input
            type="text"
            className="search_bar"
            placeholder="Search for weather"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location_box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather_box">
              <div className="temp">{`${weather.main.temp}°c`}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
