import {useState} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

const CartItemMd = props => {
  const {details, increaseItems1, decreaseItems1} = props
  const {id} = details

  const [qty, setQty] = useState(details.quantity)

  const [total1, setTotal] = useState(details.cost)

  const decreaseItems = () => {
    if (qty > 1) {
      setQty(qty - 1)
      decreaseItems1(id, details.cost)
    }
  }

  const increaseItems = () => {
    setQty(qty + 1)
    increaseItems1(id, details.cost)
  }

  return (
    <li className="cartItemContainerMd pb-3">
      <img src={details.imageUrl} className="foodItemImgMd" alt="xys" />
      <div>
        <h1 className="cartItemName">{details.name}</h1>
        <div className="buttonContainer1">
          <button
            type="button"
            onClick={decreaseItems}
            data-testid="decrement-quantity"
            className="buttonStyleMd"
          >
            -
          </button>
          <div className="counter" data-testid="item-quantity">
            {details.quantity}
          </div>
          <button
            type="button"
            onClick={increaseItems}
            data-testid="increment-quantity"
            className="buttonStyleMd"
          >
            +
          </button>
        </div>
        <div className="buttonContainer1">
          <FaRupeeSign className="cartRupeeSignMd" />
          <h1 className="cartPriceMd">{details.cost * details.quantity}.00</h1>
        </div>
      </div>
    </li>
  )
}

export default CartItemMd
