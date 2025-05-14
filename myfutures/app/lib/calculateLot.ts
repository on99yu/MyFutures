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
  const targetProfit = margin * (targetReturnPercent / 100);
  if (atr === 0) return 0;

  if (symbol === "NAS100") {
    if (atr === 0) return 0;
    const lotSize = targetProfit / atr;
    return parseFloat(lotSize.toFixed(2));
  }

  if (symbol === "OIL") {
    const lotSize = (targetProfit * 0.01) / atr;
    return parseFloat(lotSize.toFixed(2));
  }

  return 0;
};
