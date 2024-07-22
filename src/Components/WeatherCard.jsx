import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import night from '../assets/images/download (1).jpeg'
import '../index.css'; // Ensure this file contains the necessary styles

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  pressure,
  feels_like,
}) => {
  const [icon, setIcon] = useState(sun); // Set default icon
  const [iconUrl, setIconUrl] = useState('');

  // Map API icon codes to local icons
  const iconMap = {
    '01d': sun,      // Clear Sky Day
    '02d': cloud,    // Few Clouds Day
    '02n': cloud,    // Few Clouds Night
    '03d': cloud,    // Scattered Clouds
    '03n': cloud,    // Scattered Clouds
    '04d': cloud,    // Broken Clouds
    '04n': cloud,    // Broken Clouds
    '09d': rain,     // Shower Rain Day
    '09n': rain,     // Shower Rain Night
    '10d': rain,     // Rain Day
    '10n': rain,     // Rain Night
    '11d': storm,    // Thunderstorm Day
    '11n': storm,    // Thunderstorm Night
    '13d': snow,     // Snow Day
    '13n': snow,     // Snow Night
    '50d': fog,      // Mist Day
    '50n': fog,      // Mist Night
  };

  useEffect(() => {
    if (iconString) {
      setIcon(iconMap[iconString] || sun); // Default to sun if iconString doesn't match
      // Construct the icon URL based on the iconString from the API
      const iconUrlBase = 'https://openweathermap.org/img/wn/';
      const iconSize = '@2x.png'; // Can be '@2x.png' or '@4x.png' for different resolutions
      setIconUrl(`${iconUrlBase}${iconString}${iconSize}`);
    }
  }, [iconString]);

  return (
    <div className="w-[30rem] min-w-[25rem] h-[35rem] glassCard p-6 rounded-xl shadow-lg backdrop-blur-lg bg-white/30">
      <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
        <img src={icon} alt="weather icon" className="w-24 h-24" />
        <p className="font-bold text-6xl text-white">
          {Math.round(temperature)} &deg;C
        </p>
      </div>
      <div className="font-bold text-center text-2xl text-white">{place}</div>
      <div className="font-bold text-center text-2xl text-white">{iconString}</div>
      <div className="w-full flex justify-between items-center mt-4 text-white">
        <p className="flex-1 text-center p-2">
          {new Date().toDateString()}
        </p>
        <p className="flex-1 text-center p-2">{new Date().toLocaleTimeString()}</p>
      </div>
      <div className="w-full flex justify-between items-center mt-4 gap-4 text-white">
        <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
          Wind Speed <span className="font-normal">{windspeed} km/h</span>
        </p>
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
          Humidity <span className="font-normal">{humidity} %</span>
        </p>
      </div>
      <div className="w-full flex justify-between items-center mt-4 gap-4 text-white">
        <p className="flex-1 text-center p-2 font-bold bg-orange-600 shadow rounded-lg">
          Pressure <span className="font-normal">{pressure} hPa</span>
        </p>
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-violet-600">
          Feels Like <span className="font-normal">{Math.round(feels_like)}&deg;C</span>
        </p>
      </div>
      <div className="w-full p-3 mt-4 flex justify-between items-center text-white">
        <p className="font-semibold text-xl">Heat Index</p>
        <p className="text-xl">{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className="bg-slate-600" />
      <div className="w-full p-4 flex justify-center items-center text-4xl font-semibold text-white">
        {conditions}
      </div>
      <div className="text-center text-gray-200 font-bold">@Future | KL Nkosi</div>
    </div>
  );
};

export default WeatherCard;
