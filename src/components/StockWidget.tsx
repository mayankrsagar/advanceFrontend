'use client';

import React, { useState } from 'react';

import StockChart from './StockChart';
import SymbolSearch from './SymbolSearch';

const StockWidget: React.FC = () => {
  const [symbol, setSymbol] = useState('AAPL');

  return (
    <div>
      <SymbolSearch onSearch={setSymbol} />
      <StockChart symbol={symbol} />
    </div>
  );
};

export default StockWidget;
