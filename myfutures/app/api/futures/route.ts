// app/api/futures/route.ts
import { NextResponse } from "next/server";
import { calculateATR } from "../../lib/calculateATR";
import { Symbol } from "@/app/data/symbol";
import { convertATRToPoint } from "../../lib/convertATR"; // ATR 변환 함수

function formatDate(d: Date): string {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const min = "00";
  return `${yyyy}-${mm}-${dd}-${hh}:${min}`;
}

// UTC 시간대의 거래 시간 범위를 가져오는 함수
function getTradingHourRangeUTC(): { startTime: string; endTime: string } {
  const now = new Date();
  const end = new Date(now);
  end.setUTCMinutes(0, 0, 0);

  const tradingHours: Date[] = [];
  const temp = new Date(end);

  while (tradingHours.length < 50) {
    // 여유롭게 확보
    const day = temp.getUTCDay();
    if (day !== 0 && day !== 6) {
      tradingHours.unshift(new Date(temp));
    }
    temp.setUTCHours(temp.getUTCHours() - 1);
  }

  const startTime = formatDate(tradingHours[0]);
  const endTime = formatDate(tradingHours[tradingHours.length - 1]);

  return { startTime, endTime };
}

export async function GET() {
  const { startTime, endTime } = getTradingHourRangeUTC();
  const apiKey = process.env.TRADERMADE_API_KEY;

  if (!apiKey) {
    console.error("❌ API key is missing");
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const results = await Promise.all(
    Symbol.map(async (symbol) => {
      const url = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${symbol}&api_key=${apiKey}&start_date=${startTime}&end_date=${endTime}&format=records&interval=hourly`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const quotes = data?.quotes;

        if (!quotes || quotes.length < 15) {
          return { symbol, atr: 0, error: "Not enough data" };
        }

        const atrRaw = calculateATR(quotes.slice(-15));
        const { value, original, converted } = convertATRToPoint(
          atrRaw,
          symbol
        );

        return { symbol, atr: value, originalATR: original, converted };
      } catch (error: unknown) {
        if (error instanceof Error) {
          return { symbol, atr: 0, error: `Fetch failed: ${error.message}` };
        }
        return { symbol, atr: 0, error: "Fetch failed: unknown error" };
      }
    })
  );

  return NextResponse.json({
    data: results,
    timestamp: new Date().toISOString(),
  });
}
