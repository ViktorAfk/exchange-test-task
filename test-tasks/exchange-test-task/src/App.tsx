import { useState } from "react"
import cn from "classnames";
import { useWebSocket } from "./hooks/useWebSocket";
import './App.css'
import { ModalDialog } from "./components/ModalDialog";
const streamValue = 'ethusdt@markPrice';

export const App = () => {
const [currentValue, setCurrentValue] = useState<number>(0);
const [chooseAction, setChooseAction] = useState<string>('');
const [usdtAmount, setUsdtAmount] = useState<number>(10000);
const [ethAmount, setEthEmount] = useState<number>(0);
const [modal, setModal] = useState(false);
const [modalMessage, setModalMessage] = useState('')
const [currentCurency] = useWebSocket(streamValue);
const [history, setHistory] = useState<string[]>([])
const totalEmount = Math.round((currentCurency * currentValue) * 100) / 100;
const actionValue = chooseAction === 'sell' ? 'You will earn' : 'You will spent';

const buyMessage = `Congratulatons! You have bought ${currentValue}ETH`;
const sellMessage = `Congratulatons! You have earned ${totalEmount}$`;
const notEnoughMessage = 'Sorry, you don\'t have enough money. Recharge your balance please.'
const notEnoughEthMessage = 'Sorry, you don\'t have enough ETH. Recharge your balance please.'

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  if(isNaN(Number(value))) {
    return;
  }
  setCurrentValue(Number(value));
 }

const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (currentValue === 0) {
    return;
  }

  if (chooseAction === 'sell' && ethAmount < currentValue) {
    setModalMessage(notEnoughEthMessage);
    setHistory(currentHistory => [...currentHistory, notEnoughEthMessage]);
    setModal(true);
  }

  if (totalEmount > usdtAmount) {
    setModalMessage(() => notEnoughMessage);
    setHistory(currentHistory => [...currentHistory, notEnoughMessage])
    setModal(true);
   return;
  }

  if (chooseAction === 'sell' && ethAmount > 0) {
    setModalMessage(sellMessage);
    setHistory(currentHistory => [...currentHistory, sellMessage])
    setModal(true);
    setUsdtAmount(currentUsdt => currentUsdt + totalEmount);
    setEthEmount(currentEth => currentEth - currentValue);
    setCurrentValue(0);
  }

  if (chooseAction === 'buy') {
    setModalMessage(buyMessage);
    setHistory(currentHistory => [...currentHistory, buyMessage]);
    setModal(true);
    setUsdtAmount(currentUsdt => currentUsdt - totalEmount);
    setEthEmount(currentEth => currentEth + currentValue);
    setCurrentValue(0);
  }
    
}
  return (
    <div className="container">
      <div className="currency-container">
        <h1 className="currency-header">CryptoCurrency Dashboard</h1>

        <div className="currency-line">
          <div className="currency-image">
            <img className="image-eth" src="/ETH.png" alt="ETH image"/>
          </div>

          <p className="currency-info">{currentCurency === 0 ? 'loading...' : currentCurency}</p>
        </div>
        
        <div className="currency-board">
          <div>
            <h2 className="currency-boar__header">Transaction</h2>
            <div className="actions">
              <h3 className="action-header">Choose action</h3>
              
              <div className="currency-buttons">
                <button onClick={() => setChooseAction('sell')} className={cn("currency-button", {
                  'currency-button--active': chooseAction === 'sell'
                })}>Sell</button>

                <button onClick={() => setChooseAction('buy')} className={cn("currency-button", {
                  "currency-button--active": chooseAction === 'buy'
                })}>Buy</button>
              </div>
            </div>
            <p className="currency-dashboar__item">{`${actionValue}: ${totalEmount}`}</p>
            <form onSubmit={handleSubmit} action="" className="currency-dashboar__item">
              <label className="form-label" htmlFor="input-value">
                ETH amount:
              </label>

              <input
                id="input-value"
                className="input" 
                value={currentValue} 
                type="text" 
                onChange={handleChange}
              />
              <button type="submit" className="currency-button">
                  Submit transaction
              </button>
            </form>
          </div>

          <div className="currency-dashboar__item">
            <h2 className="currency-boar__header">Wallet:</h2>
            <div>
              <div className="balance-item">
                <p>Amount of ETH:</p>
                <span>{ethAmount}</span>
              </div>

              <div className="balance-item">
                <p>Amount of USDT:</p>
                <span>{Math.round(usdtAmount * 100) / 100}</span>
              </div>
            </div>
            <div className="history">
              <h3>History</h3>
              { history.length > 0 && (
                <ul className="history-container">
                {history.map(item => (
                  <li>{item}</li>
                ))}
              </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalDialog openModal={modal} closeModal={setModal}>
        <p className="dialog-message">{modalMessage}</p>
      </ModalDialog>
    </div>
  )
}