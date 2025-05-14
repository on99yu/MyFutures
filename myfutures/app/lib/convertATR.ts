export const convertATRToPoint = (atr: number, symbol: string): number => {
  let convertedATR = atr;
  if (symbol === 'EURUSD') {
    convertedATR = atr * 10000;  // EURUSD는 0.0001 단위로 변환
  } else if (symbol === 'OIL') {
    convertedATR = atr * 100;    // OIL은 0.01 단위로 변환
  }
  return convertedATR;
};