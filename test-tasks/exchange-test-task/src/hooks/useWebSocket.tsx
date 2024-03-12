import { useEffect, useState } from "react";
import { MarketPrice } from "../types/MarkPrice";

const baseURL = "wss://fstream.binance.com/ws/";
// const waitingMasage = "We don't have infromation now. Please waite a moment.";
export const useWebSocket = (streamName: string) => {
  const [ value, setValue ] = useState<MarketPrice | null>(null);
  const currentCurency = value ? Number(value.P) : 0;
  useEffect(() => {
    const socket = new WebSocket(baseURL + streamName);
  
    socket.onmessage = (event) => {
      const marketPrice: MarketPrice = JSON.parse(event.data);
      setValue(marketPrice)}

    return () => {
      socket.close
    }
  })

  return [currentCurency]
}