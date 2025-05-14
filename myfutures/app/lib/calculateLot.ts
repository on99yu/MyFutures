export const calculateLot = ({
  symbol,
  margin,
  atr,
  targetReturnPercent,
}: {
  symbol: string;
  margin: number;
  atr: number;
  targetReturnPercent: number;
}): number => {
  if (atr <= 0 || margin <= 0 || targetReturnPercent <= 0) return 0;

  const targetProfit = margin * (targetReturnPercent / 100);

  // symbol별 multiplier 설정
  const symbolMultipliers: { [key: string]: number } = {
    NAS100: 1,
    OIL: 1,
    XAUUSD: 100,     // (targetProfit / atr) * 0.01 → multiplier = 1 / 0.01 = 100
    EURUSD: 10,
  };

  const multiplier = symbolMultipliers[symbol];

  if (!multiplier) return 0;

  const lotSize = targetProfit / (atr * multiplier);

  return parseFloat(lotSize.toFixed(2));
};
