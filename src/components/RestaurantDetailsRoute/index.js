import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RestBanner from '../RestBanner'
import RestItem from '../RestItem'
import './index.css'

class RestaurantDetailsRoute extends Component {
  state = {restDetails: [], status: '', cartItems: [], qty: 1}

  componentDidMount() {
    this.specificRestCall()
  }

  specificRestCall = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({status: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
      }

      this.setState({restDetails: convertedData, status: 'success'})
    } else {
      this.setState({status: 'failure'})
    }
  }

  onLoading = () => (
    <div testid="restaurant-details-loader" className="loaderBg1">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  onFailure = () => (
    <div className="failBg1">
      <img
        src="https://i.postimg.cc/kXcrNy1x/Layer-1-1.png"
        className="failImg1"
        alt="not found"
      />
      <h1 className="failHead1">Page Not Found</h1>
      <p className="failPara1">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
    </div>
  )

  addCartItems = data => {
    const {qty, cartItems} = this.state
    const {cost, id, imageUrl, name} = data
    const cartDetails = {cost, id, imageUrl, name}

    const cart = JSON.parse(localStorage.getItem('cartData'))

    if (cart === null) {
      this.setState({CartItems: {...cartDetails, quantity: qty}})
    } else {
      const exist = cart.find(each => each.id === id)
      if (exist) {
        this.setState({
          cartItems: cart.map(each =>
            each.id === id ? {...each, quantity: each.quantity + 1} : each,
          ),
        })
      } else {
        this.setState({cartItems: [...cart, {...cartDetails, quantity: qty}]})
      }
    }
    localStorage.setItem('cartData', JSON.stringify(cartItems))
  }

  subCartItems = data => {
    const {qty, cartItems} = this.state
    const {cost, id, imageUrl, name} = data
    const cartDetails = {cost, id, imageUrl, name}

    const cart = JSON.parse(localStorage.getItem('cartData'))

    const exist = cart.find(each => each.id === id)
    if (exist) {
      this.setState({
        cartItems: cart.map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      })
    }
  }

  onSuccess = () => {
    const {restDetails, cartItems} = this.state
    const {foodItems} = restDetails

    localStorage.setItem('cartData', JSON.stringify(cartItems))

    return (
      <>
        <div className="eachRestDetailsBg1">
          <RestBanner items={restDetails} />
          <ul className="itemsMainBg">
            {foodItems.map(each => (
              <RestItem
                addCartItems={this.addCartItems}
                subCartItems={this.subCartItems}
                items={each}
                key={each.id}
              />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  funCall = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.onLoading()
      case 'failure':
        return this.onFailure()
      case 'success':
        return this.onSuccess()
      default:
        return null
    }
  }

  render() {
    const {restDetails} = this.state
    const {foodItems} = restDetails
    if (foodItems === undefined) {
      return null
    }

    return (
      <>
        <Header />
        {this.funCall()}
      </>
    )
  }
}

export default RestaurantDetailsRoute
