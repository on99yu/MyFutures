'use client';

import React, { useState } from 'react';
import { tradingData as initialData, Trade } from '@/app/data/tradingDataDummy';
import TradeTable from '@/app/ui/Trades/TradeTable';
import DateSelector from '@/app/ui/Trades/DateSelector';
import TradeInputForm from '@/app/ui/Trades/TradeInputForm';

export default function TradingLog() {
  const [viewMode, setViewMode] = useState<'input' | 'history'>('input');
  const [mode, setMode] = useState<'range' | 'monthly'>('range');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
  );
  const [trades, setTrades] = useState<Trade[]>(initialData);

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // 월별 드롭다운 옵션 생성
  const monthOptions = Array.from(
    new Set(
      trades.map((trade) => {
        const date = new Date(trade.entryTime);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      })
    )
  ).map((month) => ({
    value: month,
    label: month,
  }));

  // 기간별 데이터 필터링 (entryTime 기준)
  const filteredByRange = trades.filter((trade) => {
    const tradeDate = new Date(trade.entryTime);
    return formatDate(tradeDate) >= formatDate(startDate) && formatDate(tradeDate) <= formatDate(endDate);
  });

  // 월별 데이터 필터링 (entryTime 기준)
  const filteredByMonth = trades.filter((trade) => {
    const tradeDate = new Date(trade.entryTime);
    const tradeMonth = `${tradeDate.getFullYear()}-${(tradeDate.getMonth() + 1).toString().padStart(2, '0')}`;
    return tradeMonth === selectedMonth;
  });

  // 표시할 데이터
  const filteredData = mode === 'range' ? filteredByRange : filteredByMonth;

  // 날짜 변경 핸들러
  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      if (new Date(formatDate(endDate)) < new Date(formatDate(date))) {
        setEndDate(date);
      }
    } else {
      setStartDate(new Date());
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
    } else {
      setEndDate(new Date());
    }
  };

  // 새 트레이드 추가
  const handleAddTrade = (newTrade: Trade) => {
    setTrades((prev) => [...prev, newTrade]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">트레이딩 기록</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setViewMode(viewMode === 'input' ? 'history' : 'input')}
        >
          {viewMode === 'input' ? '기록 보기' : '오늘의 매매'}
        </button>
      </div>
      {viewMode === 'input' ? (
        <TradeInputForm trades={trades} onAddTrade={handleAddTrade} />
      ) : (
        <>
          <DateSelector
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            selectedMonth={selectedMonth}
            monthOptions={monthOptions}
            onModeChange={setMode}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onMonthChange={setSelectedMonth}
          />
          <TradeTable trades={filteredData} />
        </>
      )}
    </div>
  );
}