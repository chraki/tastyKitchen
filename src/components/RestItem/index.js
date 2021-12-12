import {Component, useState} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import './index.css'

const RestItem = props => {
  const [addClick, isAddClicked] = useState(false)
  const [qty, setQty] = useState(1)

  const {addCartItems, subCartItems, items} = props
  const each = {...items}

  const onAddFun = () => {
    isAddClicked(true)
    addCartItems(items)
  }

  const onDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
    if (qty <= 1) {
      isAddClicked(false)
    }

    subCartItems(items)
  }

  const onIncrement = () => {
    if (qty > 0) {
      setQty(qty + 1)
    }
    addCartItems(items)
  }

  return (
    <>
      <li testid="foodItem" className="eachFoodCard">
        <div>
          <img
            src={each.imageUrl}
            className="eachFoodCardImg"
            alt="food item"
          />
        </div>
        <div className="itemsContent">
          <h1 className="itemName">{each.name}</h1>
          <div className="itemRateContainer">
            <FaRupeeSign className="itemRateImg" />
            <p className="itemCost">{each.cost}.00</p>
          </div>

          <div className="itemStarContainer ">
            <FaStar className="itemStarImg" />
            <p className="itemStarValue">{each.rating}</p>
          </div>
          {addClick ? (
            <div className="counterBg">
              <button
                testid="decrement-count"
                className="but"
                type="button"
                onClick={onDecrement}
              >
                -
              </button>
              <div className="counter" testid="active-count">
                {qty}
              </div>
              <button
                testid="increment-count"
                className="but"
                type="button"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
          ) : (
            <button className="addButton" onClick={onAddFun} type="button">
              Add
            </button>
          )}
        </div>
      </li>
    </>
  )
}

export default RestItem
