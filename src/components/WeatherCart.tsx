// components/WeatherCard.tsx

'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  get5DayForecast,
  getWeatherByCity,
} from '@/services/weather';

import CitySearch from './CitySearch';

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

interface ForecastPoint {
  dt_txt: string;
  main: { temp: number };
}

const WeatherCard: React.FC = () => {
  const [cityName, setCityName] = useState('Mumbai');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const w = await getWeatherByCity(cityName);
        setWeather(w);

        const raw = await get5DayForecast(cityName);
        // pick only the forecasts at 12:00:00 each day
        const dailyNoon = raw.filter((pt: ForecastPoint) =>
          pt.dt_txt.endsWith('12:00:00')
        );
        setForecast(dailyNoon);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [cityName]);

  if (loading || !weather) {
    return (
      <div className="p-4 rounded-xl bg-gray-100 shadow-md w-full max-w-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl max-w-sm text-center">
      <CitySearch onSearch={setCityName} />

      <h2 className="text-xl font-semibold text-primary">{weather.name}</h2>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        height={100}
        width={100}
        className="mx-auto"
      />
      <p className="text-4xl font-bold">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="text-sm capitalize text-gray-600">
        {weather.weather[0].description}
      </p>

      {forecast.length > 0 && (
        <div className="mt-6 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={forecast.map(pt => ({
                date: new Date(pt.dt_txt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                }),
                temp: pt.main.temp,
              }))}
            >
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#1E3A8A"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
