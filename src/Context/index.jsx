import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [place, setPlace] = useState('Johannesburg');
    const [thisLocation, setLocation] = useState('');

    const fetchWeatherData = async () => {
        const apiKey = '13d787b766f8f5cfc1d56aab4a8a9fc5'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            console.log('API response:', response); // Log full API response for debugging
            const thisData = response.data;
            setLocation(thisData.name);
            const weatherData = {
                temperature: thisData.main.temp,
                windspeed: thisData.wind.speed,
                humidity: thisData.main.humidity,
                heatIndex: thisData.main.feels_like,
                iconString: thisData.weather[0].main,
                conditions: thisData.weather[0].description,
                place: thisData.name,
                pressure: thisData.main.pressure,
                feels_like: thisData.main.feels_like,
                icon: thisData.weather[0].icon,
                

            };
            setWeather(weatherData);
        } catch (e) {
            console.error('Error fetching weather data:', e); // More descriptive error logging
            alert('Unable to fetch weather data for the specified location.');
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [place]); // Added place as a dependency to re-fetch when place changes

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
