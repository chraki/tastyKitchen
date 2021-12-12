import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartItemMd from '../CartItemMd'

import './index.css'

class Cart extends Component {
  state = {isOrderPlaced: false, total1: 0}

  componentDidMount() {
    this.renderTotal()
  }

  renderTotal = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartData'))
    const total = cartItems.reduce(
      // eslint-disable-next-line prettier/prettier
      (cost, item) => cost + item.quantity * item.cost,
      0,
    )
    this.setState({total1: total})
  }

  placed = () => {
    this.setState({isOrderPlaced: true})
  }

  addAmount = rate => {
    this.setState({total1: rate})
  }

  increaseItems1 = (id, price) => {
    const data = JSON.parse(localStorage.getItem('cartData'))

    console.log(data)

    const dat = data.map(each =>
      each.id === id ? {...each, quantity: each.quantity + 1} : each,
    )
    this.setState(prevState => ({total1: prevState.total1 + price}))

    localStorage.setItem('cartData', JSON.stringify(dat))
  }

  decreaseItems1 = (id, price, qty) => {
    const data = JSON.parse(localStorage.getItem('cartData'))
    const dat = data.map(each =>
      each.id === id ? {...each, quantity: each.quantity - 1} : each,
    )
    this.setState(prevState => ({total1: prevState.total1 - price}))
    localStorage.setItem('cartData', JSON.stringify(dat))
  }

  withOrders = () => {
    const {isOrderPlaced, total1} = this.state

    const cartLists = JSON.parse(localStorage.getItem('cartData'))

    return (
      <>
        <div testid="cartItem" className="cartContainer">
          <div className="cartBg">
            <ul className="cartHeadContainer">
              <li className="cartHead">Item</li>
              <li className="cartHead">Quantity</li>
              <li className="cartHead">Price</li>
            </ul>
            {cartLists.map(each => (
              <CartItem
                increaseItems1={this.increaseItems1}
                decreaseItems1={this.decreaseItems1}
                details={each}
                key={each.id}
                addAmount={this.addAmount}
              />
            ))}
            <hr className="line" />
            <div className="bottomLine">
              <h1 className="totalOrder">Order Total: </h1>
              <div className="buttonContainer">
                <div className="bottomTotal">
                  <FaRupeeSign className="cartRupeeSignBlack" />
                  <h1 className="totalOrder1" testid="total-price">
                    {total1}.00
                  </h1>
                </div>
                <button
                  className="orderButton"
                  onClick={this.placed}
                  type="button"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="mobileCartBg">
            {cartLists.map(each => (
              <CartItemMd
                increaseItems1={this.increaseItems1}
                decreaseItems1={this.decreaseItems1}
                details={each}
                key={each.id}
              />
            ))}
            <hr className="line" />
            <div className="bottomLine">
              <h1 className="totalOrder">Order Total: </h1>
              <div className="buttonContainer">
                <div className="bottomTotal">
                  <FaRupeeSign className="cartRupeeSignBlack" />
                  <h1 className="totalOrder1" testid="total-price">
                    {total1}.00
                  </h1>
                </div>
                <button
                  onClick={this.placed}
                  className="orderButton"
                  type="button"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  clearCart = () => {
    localStorage.clear()
  }

  onPlaceOrder = () => (
    <div className="NoOrdersContainer">
      <div className="placeOrderContainer">
        <img
          src="https://i.postimg.cc/CKHkRbnB/Vector.png"
          className="placeOrderImg"
          alt="xx"
        />
        <h1 className="noOrdersHead">Payment Successful</h1>
        <p className="noOrdersPara">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/" className="linkClass">
          <button
            className="orderButton"
            onClick={this.clearCart}
            type="button"
          >
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  )

  onNoOrders = () => (
    <div className="NoOrdersContainer">
      <img
        src="https://i.postimg.cc/SNwsqHPD/OBJECTS.png"
        className="noOrdersImg"
        alt="empty cart"
      />
      <h1 className="noOrdersHead">No Order Yet!</h1>
      <p className="noOrdersPara">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="linkClass">
        <button className="orderButton" type="button">
          Order Now
        </button>
      </Link>
    </div>
  )

  afterNoOrders = cartList => {
    const {isOrderPlaced} = this.state
    return <>{isOrderPlaced ? this.onPlaceOrder() : this.withOrders()}</>
  }

  render() {
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    return (
      <>
        <Header />
        {cartList === null || cartList.length === 0
          ? this.onNoOrders()
          : this.afterNoOrders(cartList)}
      </>
    )
  }
}

export default Cart
