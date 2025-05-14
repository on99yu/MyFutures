// app/components/ATRCalculator.tsx
"use client";
import { useState } from "react";
import { useATRStore } from "../data/atrStore";

interface FutureData {
  symbol: string;
  atr: number;
  error?: string;
  originalATR: number;
  converted?: boolean;
}

interface ApiResponse {
  data: FutureData[];
  timestamp: string;
}

export default function ATRCalculator() {
  const { futuresData, updatedAt, setFuturesData } = useATRStore();
  const [loading, setLoading] = useState(false);

  const fetchATR = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/futures", { cache: "no-store" });
      const result: ApiResponse = await response.json();
      setFuturesData(result.data, result.timestamp);
    } catch (error) {
      console.error("Error fetching ATR:", error);
      setFuturesData([], null);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={fetchATR}
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {loading ? "Loading..." : "ATR 불러오기"}
        </button>
        {updatedAt && (
          <span className="text-sm text-gray-600">
            최근 갱신: {formatTime(updatedAt)}
          </span>
        )}
      </div>

      <table className="w-full border-collapse border mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">종목</th>
            <th className="border p-2">ATR (14)</th>
          </tr>
        </thead>
        <tbody>
          {futuresData.length > 0 ? (
            futuresData.map((future) => (
              <tr key={future.symbol}>
                <td className="border p-2">{future.symbol}</td>
                <td className="border p-2">
                  {future.error ? (
                    `Error: ${future.error}`
                  ) : future.converted ? (
                    <>
                      <span className="bold-2">{future.atr}</span>
                      <span className="text-ts"> pts</span>
                      <span className="text-ts text-gray-500">
                        ({future.originalATR.toFixed(4)})
                      </span>
                    </>
                  ) : (
                    `${future.atr} pts`
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="border p-2 text-center">
                "ATR 불러오기" 버튼을 누르세요
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
