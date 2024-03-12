 export type MarketPrice = {
   e: string,     // Event type
   E: number,         // Event time
   s: string,             // Symbol
   p: string,      // Mark price
   i: string,      // Index price
   P: string,      // Estimated Settle Price, only useful in the last hour before the settlement starts
   r: string,          // Funding rate
   T: number          // Next funding time
}
