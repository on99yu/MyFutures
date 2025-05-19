"use client";
import { useState } from "react";
import { Symbol, SymbolData } from "@/app/data/symbol";
import { calculateLot } from "@/app/lib/calculateLot";

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

  // 선택된 종목의 수수료 조회
  const getCommissionPerLot = (symbolName: string): number => {
    const symbol = Symbol.find((s: SymbolData) => s.name === symbolName);
    return symbol ? symbol.commissionPerLot : 0;
  };

  // 수수료 계산 (랏수 * 1랏당 수수료)
  const commission = lotResult !== null ? lotResult * getCommissionPerLot(selectedSymbol) : 0;

  // 목표 수익 계산 (증거금 * 목표 수익률 / 100)
  const targetProfit = lotResult !== null ? (margin * targetReturn) / 100 : 0;

  // 수수료 포함 목표 수익 (목표 수익 + 수수료)
  const totalProfitWithCommission = lotResult !== null ? targetProfit + commission : 0;

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
          {Symbol.map((symbol: SymbolData) => (
            <option key={symbol.name} value={symbol.name}>
              {symbol.name}
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
          placeholder="증거금을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          1H ATR (Average True Range)
        </label>
        <input
          type="text"
          min="0"
          inputMode="decimal"
          value={atr === 0 ? "" : atr}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value >= 0) {
              setAtr(value);
            }
          }}
          className="w-full p-2 border rounded-md"
          placeholder="ATR을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          목표 수익률 (%):
        </label>
        <input
          type="text"
          min="0"
          inputMode="decimal"
          pattern="[0-9]*"
          value={targetReturn === 0 ? "" : targetReturn}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value >= 0) {
              setTargetReturn(value);
            }
          }}
          className="w-full p-2 border rounded-md"
          placeholder="목표 수익률을 입력하세요"
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
          <div>
            계산된 랏수: <span className="text-blue-600">{lotResult.toFixed(2)}</span>
            <span className="ml-2">
              (수수료: ${commission.toFixed(2)})
            </span>
          </div>
          <div className="mt-2">
            수수료 포함 목표 수익: <span className="text-blue-600">${totalProfitWithCommission.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotCalculator;