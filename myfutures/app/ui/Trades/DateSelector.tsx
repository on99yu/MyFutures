import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectorProps {
  mode: 'range' | 'monthly';
  startDate: Date;
  endDate: Date;
  selectedMonth: string;
  monthOptions: { value: string; label: string }[];
  onModeChange: (mode: 'range' | 'monthly') => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onMonthChange: (month: string) => void;
}

export default function DateSelector({
  mode,
  startDate,
  endDate,
  selectedMonth,
  monthOptions,
  onModeChange,
  onStartDateChange,
  onEndDateChange,
  onMonthChange,
}: DateSelectorProps) {
  return (
    <div className="mb-4">
      {/* 모드 전환 */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === 'range' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('range')}
        >
          기간 선택
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('monthly')}
        >
          월별 보기
        </button>
      </div>

      {/* 날짜 선택 UI */}
      {mode === 'range' ? (
        <div className="bg-gray-100 p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label className="text-lg font-semibold mr-2">시작 날짜:</label>
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              showPopperArrow={false}
              maxDate={new Date()}
            />
          </div>
          <div className="flex items-center">
            <label className="text-lg font-semibold mr-2">종료 날짜:</label>
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              showPopperArrow={false}
              maxDate={new Date()}
              minDate={startDate}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-3 rounded-lg flex items-center">
          <label className="text-lg font-semibold mr-2">월 선택:</label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}