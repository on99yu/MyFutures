import React from 'react';
import { Trade } from '../../data/tradingDataDummy';

interface TradeTableProps {
  trades: Trade[];
}

export default function TradeTable({ trades }: TradeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">진입시간</th>
            <th className="py-3 px-6 text-left">청산날짜</th>
            <th className="py-3 px-6 text-left">종목</th>
            <th className="py-3 px-6 text-left">포지션</th>
            <th className="py-3 px-6 text-left">수익</th>
            <th className="py-3 px-6 text-left">근거</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {trades.length > 0 ? (
            trades.map((trade, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{trade.entryTime}</td>
                <td className="py-3 px-6 text-left">{trade.exitDate}</td>
                <td className="py-3 px-6 text-left">{trade.symbol}</td>
                <td className="py-3 px-6 text-left">{trade.position}</td>
                <td className={`py-3 px-6 text-left ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trade.profit >= 0 ? `+$${trade.profit}` : `-$${Math.abs(trade.profit)}`}
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex flex-wrap gap-2">
                    {trade.reasons.map((reason, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {reason}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-3 px-6 text-center text-gray-500">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}