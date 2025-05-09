export interface Candle {
    open: number;
    high: number;
    low: number;
    close: number;
    datetime: string;
  }
  
  export function calculateATR(candles: Candle[], period: number = 14): number {
    if (candles.length < period) return 0;
  
    const trueRanges: number[] = [];
  
    for (let i = 1; i < candles.length; i++) {
      const current = candles[i];
      const previous = candles[i - 1];
      const highLow = current.high - current.low;
      const highPrevClose = Math.abs(current.high - previous.close);
      const lowPrevClose = Math.abs(current.low - previous.close);
      const trueRange = Math.max(highLow, highPrevClose, lowPrevClose);
      trueRanges.push(trueRange);
    }
  
    const atr = trueRanges.slice(-period).reduce((sum, tr) => sum + tr, 0) / period;
    return Number(atr.toFixed(4));
  }