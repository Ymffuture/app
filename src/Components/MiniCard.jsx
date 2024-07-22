import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';


const MiniCard = ({ time, temperature, iconString }) => {
  const [icon, setIcon] = useState(sun);

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
    }
  }, [iconString]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">
        {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(' ')[0]}
      </p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img src={icon} alt="forecast icon" className="w-[4rem] h-[4rem]" />
      </div>
      <p className="text-center font-bold">{temperature} &deg;C</p>
    </div>
  );
};

export default MiniCard;
