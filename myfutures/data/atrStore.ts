import { create } from "zustand";

interface FutureData {
  symbol: string;
  atr: number;
  error?: string;
  originalATR: number;
  converted?: boolean;
}

interface ATRState {
  futuresData: FutureData[];
  updatedAt: string | null;
  setFuturesData: (data: FutureData[], timestamp: string | null ) => void;
}

export const useATRStore = create<ATRState>((set) => ({
  futuresData: [],
  updatedAt: null,
  setFuturesData: (data, timestamp) =>
    set(() => ({
      futuresData: data,
      updatedAt: timestamp,
    })),
}));