import {Component} from 'react'
import KitchenContext from '../../context/KitchenContext'
import './index.css'

class Counter extends Component {
  state = {quantity: 1}

  const onDecrement = () => {
            if (quantity > 0) {
              this.setState(previous => ({
                quantity: previous.quantity - 1,
              }))
              decreaseItems(item.id, quantity)
            }
          }

          const onIncrement = () => {
            this.setState(previous => ({
              quantity: previous.quantity + 1,
            }))
            increaseItems(quantity)
          }

  render() {
    const {item} = this.props
          return (
            <div className="counterBg">
              <button type="button" onClick={onDecrement}>
                -
              </button>
              <div className="counter">{quantity}</div>
              <button type="button" onClick={onIncrement}>
                +
              </button>
            </div>
          )

    
  }
}

export default Counter
