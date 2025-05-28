'use client';

import 'chart.js/auto';

import React, {
  useEffect,
  useState,
} from 'react';

import { Line } from 'react-chartjs-2';

import { fetchDailySeries } from '@/services/finance';

interface TimeSeries {
  [date: string]: {
    '1. open': string;
    '4. close': string;
  };
}

const StockChart: React.FC<{ symbol?: string }> = ({ symbol = 'AAPL' }) => {
  const [series, setSeries] = useState<TimeSeries | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchDailySeries(symbol);
        setSeries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [symbol]);

  if (loading || !series) {
    return (
      <div className="p-4 rounded-xl bg-gray-100 shadow-md w-full max-w-md">
        Loading stock data…
      </div>
    );
  }

  // Prepare Chart.js data
  const dates = Object.keys(series).sort();
  const prices = dates.map(d => parseFloat(series[d]['4. close']));

  const data = {
    labels: dates,
    datasets: [
      {
        label: `${symbol} Close Price`,
        data: prices,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
      <h3 className="text-lg font-semibold text-primary mb-4">
        {symbol} Daily Close  
      </h3>
      <Line data={data} />
    </div>
  );
};

export default StockChart;
