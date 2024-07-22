import React, { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import BackgroundLayout from './Components/BackgroundLayout';
import WeatherCard from './Components/WeatherCard';
import MiniCard from './Components/MiniCard';

const App = () => {
  const [input, setInput] = useState('');

  // Destructure context values
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  // Submit city input
  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-4xl text-indigo-600 bg-black p-4 rounded sm:text-[20px]">
          V3.0 WeatherApp
        </h1>
        <div className="bg-white w-[12rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-3">
          <img src={search} alt="search" className="w-[2.5rem] h-[1.8rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.windspeed}
          humidity={weather.humidity}
          temperature={weather.temperature}
          heatIndex={weather.heatIndex}
          iconString={weather.iconString}
          conditions={weather.conditions}
          pressure={weather.pressure}
          feels_like={weather.feels_like}
          icon={weather.icon} 
        />
        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values && values.length > 0 ? (
            values.slice(1, 7).map((curr) => (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temperature={curr.temperature}
                iconString={curr.conditions}
              />
            ))
          ) : (
            <p className="text-center text-white">No data available due to error in API</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
