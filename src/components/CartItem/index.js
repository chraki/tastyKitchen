import {useState} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

const CartItem = props => {
  const {details, increaseItems1, decreaseItems1} = props
  const {id} = details

  const [qty, setQty] = useState(details.quantity)

  const [total1, setTotal] = useState(details.cost)

  const decreaseItems = () => {
    if (qty > 1) {
      setQty(qty - 1)
      decreaseItems1(id, details.cost, qty)
    }
  }

  const increaseItems = () => {
    setQty(qty + 1)
    increaseItems1(id, details.cost)
  }

  return (
    <li className="cartItemContainer">
      <div className="foodItem">
        <img src={details.imageUrl} className="foodItemImg" alt="xyz" />
        <h1 className="cartItemName">{details.name}</h1>
      </div>
      <div className="foodItem111">
        <button
          type="button"
          onClick={decreaseItems}
          testid="decrement-quantity"
          className="buttonStyle"
        >
          -
        </button>
        <div className="counter" data-testid="item-quantity">
          {qty}
        </div>
        <button
          type="button"
          onClick={increaseItems}
          testid="increment-quantity"
          className="buttonStyle"
        >
          +
        </button>
      </div>
      <div className="foodItem">
        <FaRupeeSign className="cartRupeeSign" />
        <h1 className="cartPrice">{details.cost * qty}.00</h1>
      </div>
    </li>
  )
}

export default CartItem
