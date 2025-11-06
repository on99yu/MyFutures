import React, { useState } from 'react';
import { Trade } from '@/data/tradingDataDummy';
import { Symbol } from '@/data/symbol';

interface TradeInputFormProps {
  trades: Trade[];
  onAddTrade: (trade: Trade) => void;
}

interface InputTrade {
  entryTime: string;
  symbol: string;
  position: string;
  reasons: string;
  profit: string;
  exitDate: string;
}

export default function TradeInputForm({ trades, onAddTrade }: TradeInputFormProps) {
  const [newTrade, setNewTrade] = useState<InputTrade>({
    entryTime: '',
    symbol: '',
    position: 'Buy',
    reasons: '',
    profit: '',
    exitDate: '',
  });
  const [error, setError] = useState<string>('');

  const today = new Date().toISOString().split('T')[0];
  const todayTrades = trades.filter((trade) => trade.entryTime.startsWith(today));

  const formatTime = (input: string): string => {
    if (!input) return '';
    const cleanInput = input.replace(/[^0-9]/g, '');
    if (cleanInput.length !== 4) return cleanInput;
    const hours = cleanInput.slice(0, 2);
    const minutes = cleanInput.slice(2, 4);
    return `${today} ${hours}:${minutes}`;
  };

  const handleSave = () => {
    if (!newTrade.entryTime || !newTrade.symbol || !newTrade.position ||!newTrade.reasons) {
      setError('진입시간, 종목, 포지션, 근거는 필수 입력 항목입니다.');
      return;
    }
    const tradeToSave: Trade = {
      entryTime: formatTime(newTrade.entryTime),
      symbol: newTrade.symbol,
      position: newTrade.position,
      reasons: newTrade.reasons.split(',').map((r) => r.trim()).filter((r) => r),
      profit: parseFloat(newTrade.profit) || 0,
      exitDate: newTrade.exitDate || '',
    };
    onAddTrade(tradeToSave);
    setNewTrade({ entryTime: '', symbol: '', position: 'Buy', reasons: '', profit: '', exitDate: '' });
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTrade((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-4">{today} 매매</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
              <th className="py-2 px-3 text-left w-12">#</th>
              <th className="py-2 px-3 text-left w-24">진입시간</th>
              <th className="py-2 px-3 text-left w-24">종목</th>
              <th className="py-2 px-3 text-left w-24">포지션</th>
              <th className="py-2 px-3 text-left w-64">근거</th>
              <th className="py-2 px-3 text-left w-24">수익</th>
              <th className="py-2 px-3 text-left w-24">청산날짜</th>
              <th className="py-2 px-3 text-left w-16"></th>
            </tr>
          </thead>
          <tbody className="text-gray-950 text-sm font-light">
            {todayTrades.map((trade, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-3 text-left">{index + 1}</td>
                <td className="py-2 px-3 text-left whitespace-nowrap">{trade.entryTime}</td>
                <td className="py-2 px-3 text-left">{trade.symbol}</td>
                <td className="py-2 px-3 w-10text-left">{trade.position}</td>
                <td className="py-2 px-3 w-100 text-left">
                  <div className="flex flex-wrap gap-2 max-w-64 h-16 overflow-hidden">
                    {trade.reasons.map((reason, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap">
                        {reason}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={`py-2 px-3 text-left ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trade.profit >= 0 ? `+$${trade.profit}` : `-$${Math.abs(trade.profit)}`}
                </td>
                <td className="py-2 px-3 w-20 text-left whitespace-nowrap">{trade.exitDate}</td>
                <td className="py-2 px-3 text-left"></td>
              </tr>
            ))}
            {/* 입력 행 */}
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-3 text-left">{todayTrades.length + 1}</td>
              <td className="py-2 px-3 text-left">
                <input
                  type="text"
                  name="entryTime"
                  value={newTrade.entryTime}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm whitespace-nowrap"
                  placeholder="0930"
                />
              </td>
              <td className="py-2 px-3 text-left">
                <select
                  name="symbol"
                  value={newTrade.symbol}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm appearance-none"
                >
                  <option value="">선택</option>
                  {Symbol.map((sym) => (
                    <option key={sym.name} value={sym.name}>
                      {sym.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-3 text-left">
                <select
                  name="position"
                  value={newTrade.position}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm appearance-none"
                >
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </td>
              <td className="py-2 px-3 text-left">
                <input
                  type="text"
                  name="reasons"
                  value={newTrade.reasons}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Breakout, Volume Surge"
                />
              </td>
              <td className="py-2 px-3 text-left">
                <input
                  type="number"
                  name="profit"
                  value={newTrade.profit}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="0"
                  step="0.01"
                />
              </td>
              <td className="py-2 px-3  text-left">
                <input
                  type="text"
                  name="exitDate"
                  value={newTrade.exitDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm whitespace-nowrap"
                  placeholder="2025-05-19"
                />
              </td>
              <td className="py-2 px-3 text-left">
                <button
                  className="px-4 py-1 min-w-13 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSave}
                >
                  저장
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}