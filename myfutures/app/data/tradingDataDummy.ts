export interface Trade {
  entryTime: string;
  exitDate: string;
  symbol: string;
  position: string;
  profit: number;
  reasons: string[];
}

export const tradingData: Trade[] = [
  // 2025-05-19 데이터
  {
    entryTime: '2025-05-19 09:00',
    exitDate: '2025-05-19',
    symbol: 'BTC/USD',
    position: 'Long',
    profit: 1500.25,
    reasons: ['Breakout', 'Volume Surge'],
  },
  {
    entryTime: '2025-05-19 14:30',
    exitDate: '2025-05-19',
    symbol: 'ETH/USD',
    position: 'Short',
    profit: -200.75,
    reasons: ['Resistance', 'Bearish Divergence'],
  },
  // 2025-05-18 데이터
  {
    entryTime: '2025-05-18 10:15',
    exitDate: '2025-05-18',
    symbol: 'XRP/USD',
    position: 'Long',
    profit: 300.50,
    reasons: ['Support Bounce', 'RSI Oversold'],
  },
  // 2025-04-30 데이터 (다른 월)
  {
    entryTime: '2025-04-30 11:00',
    exitDate: '2025-04-30',
    symbol: 'ADA/USD',
    position: 'Short',
    profit: 450.00,
    reasons: ['Trend Reversal', 'High Volume'],
  },
  {
    entryTime: '2025-04-30 15:45',
    exitDate: '2025-04-30',
    symbol: 'SOL/USD',
    position: 'Long',
    profit: -150.20,
    reasons: ['Pullback', 'Fibonacci Retracement'],
  },
];