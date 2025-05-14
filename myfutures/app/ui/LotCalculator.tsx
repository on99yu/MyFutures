"use client";
import { useState } from "react";
import { Symbol } from "../data/symbol";
import { calculateLot } from "../lib/calculateLot"; // 위치에 맞게 경로 수정하세요

const LotCalculator = () => {
  const [margin, setMargin] = useState(1000);
  const [atr, setAtr] = useState(0);
  const [targetReturn, setTargetReturn] = useState(1);
  const [selectedSymbol, setSelectedSymbol] = useState("NAS100");
  const [lotResult, setLotResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const result = calculateLot({
      symbol: selectedSymbol,
      margin,
      atr,
      targetReturnPercent: targetReturn,
    });
    setLotResult(result);
  };

  return (
    <div className="p-4 border rounded-md shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">랏수 계산기</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">종목:</label>
        <select
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {Symbol.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">증거금:</label>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          value={margin}
          onChange={(e) =>
            setMargin(e.target.value === "" ? 0 : Number(e.target.value))
          }
          className="w-full p-2 border rounded-md"
          placeholder="Enter margin"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          1H ATR (Average True Range)
        </label>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]+" // 숫자와 선택적 소수점만 허용
          value={atr === 0 ? "" : atr}
          onChange={(e) => {
            const input = e.target.value;
            // 정규식으로 숫자와 점만 허용
            if (/^[0-9]*\.?[0-9]*$/.test(input)) {
              setAtr(input === "" ? 0 : Number(input));
            }
          }}
          className="w-full p-2 border rounded-md"
          placeholder="Enter ATR"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          목표 수익률 (%):
        </label>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          value={targetReturn}
          onChange={(e) => setTargetReturn(Number(e.target.value) || 0)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter target return"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4"
      >
        계산하기
      </button>

      {lotResult !== null && (
        <div className="text-center text-lg font-bold">
          계산된 랏수: <span className="text-blue-600">{lotResult}</span>
        </div>
      )}
    </div>
  );
};

export default LotCalculator;
