"use client";
import { useState } from "react";
import { useATRStore } from "@/data/atrStore";

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
    <div className="p-4 border rounded-md shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">ATR 계산기</h2>

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

      <table className="w-full border-collapse border">
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
                      <span className=" text-blue-600">{future.atr}</span>
                      <span className="ml-1 text-sm text-gray-600">pts</span>
                      <span className="ml-2 text-sm text-gray-400">
                        ({future.originalATR.toFixed(4)})
                      </span>
                    </>
                  ) : (
                    <>
                    <span className=" text-blue-600" >{future.atr}</span>
                    <span className="ml-1 text-sm text-gray-600">pts</span>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="border p-2 text-center text-gray-600">
                ATR 불러오기 버튼을 누르세요
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
