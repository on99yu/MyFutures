export function convertATRToPoint(atr: number, symbol: string): { value: number, original: number, converted: boolean } {
  if (symbol === 'OIL') {
    return { value: Math.round(atr * 100), original: atr, converted: true }; // 0.3 → 30
  } else if (symbol === 'EURUSD') {
    return { value: Math.round(atr * 10000), original: atr, converted: true }; // 0.0010 → 10
  }
  return { value: parseFloat(atr.toFixed(1)), original: atr, converted: false }; // 그대로 사용
}