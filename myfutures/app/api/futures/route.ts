import { NextResponse } from 'next/server';
import { calculateATR, Candle } from '../../lib/calculateATR';

export async function GET() {
  const symbols = ['US100', 'XAUUSD', 'USOIL', 'EURUSD']; // TraderMade 심볼
  const apiKey = process.env.TRADERMADE_API_KEY;

  if (!apiKey) {
    console.error('API key not configured. Please check TRADERMADE_API_KEY in .env.local');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const futuresData = await Promise.all(
      symbols.map(async (symbol) => {
        console.log(`Fetching 1-hour data for ${symbol}...`);
        try {
          // KST에서 UTC로 변환 (9시간 빼기)
          const kstNow = new Date();
          const utcNow = new Date(kstNow.getTime() - 9 * 60 * 60 * 1000); // UTC = KST - 9시간
          const utcStart = new Date(utcNow.getTime() - 24 * 60 * 60 * 1000); // 24시간 전

          console.log(`KST Time: ${kstNow.toISOString()}, UTC Time: ${utcNow.toISOString()}`);

          // YYYY-MM-DD-HH:MM 형식으로 포맷
          const formattedStartDate = `${utcStart.getFullYear()}-${String(utcStart.getMonth() + 1).padStart(2, '0')}-${String(utcStart.getDate()).padStart(2, '0')}-${String(utcStart.getHours()).padStart(2, '0')}:${String(utcStart.getMinutes()).padStart(2, '0')}`;
          const formattedEndDate = `${utcNow.getFullYear()}-${String(utcNow.getMonth() + 1).padStart(2, '0')}-${String(utcNow.getDate()).padStart(2, '0')}-${String(utcNow.getHours()).padStart(2, '0')}:${String(utcNow.getMinutes()).padStart(2, '0')}`;
          
          const url = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${symbol}&api_key=${apiKey}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&format=records&interval=hourly`;
          console.log(`Request URL for ${symbol}: ${url}`);

          const timeSeriesResponse = await fetch(url, { cache: 'no-store' });
          console.log(`HTTP Status for ${symbol}: ${timeSeriesResponse.status}`);

          const timeSeriesData = await timeSeriesResponse.json();
          console.log(`TraderMade API response for ${symbol}:`, JSON.stringify(timeSeriesData, null, 2));

          if (timeSeriesData.status !== 'success') {
            console.warn(`Failed to fetch time series for ${symbol}: Status=${timeSeriesData.status}, Error=${timeSeriesData.error || 'Unknown'}`);
            return {
              symbol: symbol === 'US100' ? 'NAS100+' : symbol === 'USOIL' ? 'USOUSD+' : symbol + '+',
              atr: 0,
              error: `Failed to fetch time series for ${symbol}: ${timeSeriesData.error || 'Unknown'}`,
            };
          }

          const candles: Candle[] = timeSeriesData.quotes.map((candle: any) => ({
            open: Number(candle.open),
            high: Number(candle.high),
            low: Number(candle.low),
            close: Number(candle.close),
            datetime: candle.date_time,
          }));

          const atr = calculateATR(candles);
          console.log(`Calculated ATR for ${symbol}: ${atr}`);

          return {
            symbol: symbol === 'US100' ? 'NAS100+' : symbol === 'USOIL' ? 'USOUSD+' : symbol + '+',
            atr,
          };
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
          return {
            symbol: symbol === 'US100' ? 'NAS100+' : symbol === 'USOIL' ? 'USOUSD+' : symbol + '+',
            atr: 0,
            error: `Error fetching data for ${symbol}: ${error.message || 'Unknown'}`,
          };
        }
      })
    );

    console.log('Futures data response:', JSON.stringify(futuresData, null, 2));
    return NextResponse.json(futuresData);
  } catch (error) {
    console.error('Global error in futures API:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}