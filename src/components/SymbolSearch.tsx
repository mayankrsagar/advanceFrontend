'use client';

import React, { useState } from 'react';

interface Props {
  onSearch: (symbol: string) => void;
}

const SymbolSearch: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim().toUpperCase());
      setInput('');
    }
  };

  return (
    <form onSubmit={submit} className="flex mb-4">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
        className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 bg-primary text-white rounded-r-lg hover:bg-primary/90"
      >
        Go
      </button>
    </form>
  );
};

export default SymbolSearch;
