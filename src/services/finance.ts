import axios from 'axios';

const BASE = 'https://www.alphavantage.co/query';
const KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;


export const fetchDailySeries = async (symbol: string) => {
  try {
    const res = await axios.get(BASE, {
      params: {
        function: 'TIME_SERIES_DAILY',  // free tier
        symbol,
        outputsize: 'compact',
        apikey: KEY,
      },
    });

    const series = res.data['Time Series (Daily)'];
    if (!series) {
      console.warn('Alpha Vantage returned no series:', res.data);
      return {};
    }
    return series;
  } catch (error) {
    console.error('Error fetching daily series from Alpha Vantage:', error);
    return {};
  }
};
