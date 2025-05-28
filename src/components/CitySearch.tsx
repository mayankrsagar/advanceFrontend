'use client';

import React, { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
}

const CitySearch: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 bg-primary text-white rounded-r-lg hover:bg-primary/90"
      >
        Search
      </button>
    </form>
  );
};

export default CitySearch;
