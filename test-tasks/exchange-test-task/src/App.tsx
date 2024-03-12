import { useState } from "react"
import { useWebSocket } from "./hooks/useWebSocket";
import './App.css'
const streamValue = 'ethusdt@markPrice';

export const App = () => {
const [ethAmount, setEthEmount] = useState<number>(0);
const [currentCurency] = useWebSocket(streamValue);
const totalEmount= currentCurency * ethAmount;
 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setEthEmount(Number(value));
 }
  return (
    <div className="container">
      <h1>Hello ETH</h1>
      <input type="number"  onChange={handleChange}/>
      <p>{currentCurency}</p>
      <p>You will earn: {totalEmount}</p>
    </div>
  )
}