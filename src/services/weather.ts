// services/weather.ts

import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const getWeatherByCity = async (city: string) => {
  const url = `${BASE_URL}/weather?q=${city}&units=metric&appid=${KEY}`;
  const res = await axios.get(url);
  return res.data;
};

export const get5DayForecast = async (city: string) => {
  // 5-day, 3-hourly forecast
  const url = `${BASE_URL}/forecast?q=${city}&units=metric&appid=${KEY}`;
  const res = await axios.get(url);
  return res.data.list; // array of { dt, main: { temp }, dt_txt, … }
};
