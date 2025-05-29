// src/app/page.tsx
'use client';

import React from 'react';

import {
  BarChart2,
  Calendar,
  Globe,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import NewsFeed from '@/components/NewsFeeds';
import StockWidget from '@/components/StockWidget';
import WeatherCard from '@/components/WeatherCart';

export default function Home() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <Navbar />
      <main className="mt-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to PGAGI Dashboard</h1>
              <p className="flex items-center space-x-2 text-lg opacity-90">
                <Calendar className="h-5 w-5" />
                <span>{today}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <BarChart2 className="h-16 w-16 opacity-75" />
            </div>
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="ml-2 text-xl font-semibold">Current Weather</h2>
            </div>
            <WeatherCard />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <BarChart2 className="h-6 w-6 text-primary" />
              <h2 className="ml-2 text-xl font-semibold">Market Snapshot</h2>
            </div>
            <StockWidget />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="ml-2 text-xl font-semibold">Latest Headlines</h2>
            </div>
            <div className="h-60 overflow-y-auto">
              <NewsFeed />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
