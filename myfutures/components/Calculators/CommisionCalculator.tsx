"use client";
import { useState } from "react";
import { Symbol, SymbolData } from "../../data/symbol";

const LotCommissionCalculator = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("NAS100");
  const [lots, setLots] = useState<number | null>(null);
  const [calculatedSymbol, setCalculatedSymbol] = useState<string | null>(null);
  const [calculatedLots, setCalculatedLots] = useState<number | null>(null);
  const [commission, setCommission] = useState<number | null>(null);

  const getCommissionPerLot = (symbolName: string): number => {
    const symbol = Symbol.find((s: SymbolData) => s.name === symbolName);
    return symbol ? symbol.commissionPerLot : 0;
  };

  const handleCalculate = () => {
    if (lots !== null && lots >= 0) {
      const perLotCommission = getCommissionPerLot(selectedSymbol);
      setCommission(lots * perLotCommission);
      setCalculatedSymbol(selectedSymbol);
      setCalculatedLots(lots);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">수수료 계산기</h2>

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
        <label className="block text-sm font-semibold mb-2">랏수:</label>
        <input
          type="text"
          min="0"
          inputMode="decimal"
          value={lots === null ? "" : lots}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value >= 0) {
              setLots(value);
            }
          }}
          className="w-full p-2 border rounded-md"
          placeholder="랏수를 입력하세요"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mb-4"
      >
        수수료 계산
      </button>

      {commission !== null &&
        calculatedSymbol !== null &&
        calculatedLots !== null && (
          <div className="text-center text-lg font-bold">
            <div>
              기준 종목:{" "}
              <span className="text-blue-600">{calculatedSymbol}</span> / 랏수:{" "}
              <span className="text-blue-600">{calculatedLots}</span> 랏
            </div>
            <div className="mt-2">
              총 수수료:{" "}
              <span className="text-green-600">${commission.toFixed(2)}</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default LotCommissionCalculator;
