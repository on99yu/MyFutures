export interface SymbolData {
  name: string;
  commissionPerLot: number; // 1랏당 수수료 (USD)
}

export const Symbol: SymbolData[] = [
  { name: "NAS100", commissionPerLot: 0.7 },
  { name: "XAUUSD", commissionPerLot: 15 },
  { name: "OIL", commissionPerLot: 2 },
  { name: "EURUSD", commissionPerLot: 15 },
];