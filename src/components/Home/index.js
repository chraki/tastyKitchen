import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Card from '../Card'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    carouselImages: [],
    restaurantsList: [],
    offset: 0,
    LIMIT: 9,
    pageNo: 1,
    sortOption: 'Lowest',
    status: '',
    toggleRest: false,
  }

  componentDidMount() {
    this.carouselCall()
    this.restaurantsCall()
  }

  restaurantsCall = async () => {
    const {offset, LIMIT, pageNo, sortOption} = this.state
    this.setState({toggleRest: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${sortOption}&offset=${
      offset + (pageNo - 1) * 9
    }&limit=${LIMIT}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {restaurants} = data

      const convertedData = restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: convertedData,
        toggleRest: false,
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  carouselCall = async () => {
    this.setState({status: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const offerData = data.offers
      const convertedData = offerData.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({carouselImages: convertedData, status: 'success'})
    }
  }

  previousPage = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      const pageNo1 = pageNo - 1
      this.setState({pageNo: pageNo1}, this.restaurantsCall)
    }
  }

  nextPage = () => {
    const {pageNo} = this.state
    if (pageNo < 4) {
      const pageNo1 = pageNo + 1
      this.setState({pageNo: pageNo1}, this.restaurantsCall)
    }
  }

  sortFun = event => {
    if (event.target.value === sortByOptions[0].value) {
      this.setState({sortOption: event.target.value}, this.restaurantsCall)
    } else {
      this.setState({sortOption: event.target.value}, this.restaurantsCall)
    }
  }

  onLoading = () => (
    <div testid="restaurants-list-loader" className="loaderBg">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  onFailure = () => (
    <div className="failBg">
      <img
        src="https://i.postimg.cc/kXcrNy1x/Layer-1-1.png"
        className="failImg"
        alt="not found"
      />
      <h1 className="failHead">Page Not Found</h1>
      <p className="failPara">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
    </div>
  )

  onSuccess = () => {
    const {carouselImages, restaurantsList, pageNo, toggleRest} = this.state
    const pre1 = '<'
    const nxt1 = '>'

    const settings = {
      dots: true,
    }

    return (
      <>
        <div className="homebg">
          <div className="homebg1">
            <Slider {...settings}>
              {carouselImages.map(each => (
                <img
                  className="curosel-image w-100"
                  src={each.imageUrl}
                  alt="offer"
                />
              ))}
            </Slider>
          </div>
          <div className="homebg1">
            <h1 className="mainHead">Popular Restaurants</h1>
            <div className="mainHeadContainer">
              <div>
                <p className="mainPara">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="sortByContainer">
                <BsFilterLeft className="filter" />
                <p className="options ml-2 mr-2">Sort by</p>
                <select className="dropDown" onChange={this.sortFun}>
                  <option value="Lowest" className="options">
                    Lowest
                  </option>
                  <option value="Highest" className="options">
                    Highest
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="homebg111">
            <h1 className="mainHead">Popular Restaurants</h1>
            <div className="mainHeadContainer">
              <div>
                <p className="mainPara">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="sortByContainer">
                <BsFilterLeft className="filter" />

                <select className="dropDown" onChange={this.sortFun}>
                  <option value="Lowest" className="options">
                    Sort by Lowest
                  </option>
                  <option value="Highest" className="options">
                    Sort by Highest
                  </option>
                </select>
              </div>
            </div>
          </div>
          <hr className="line" />
          <ul className="cardsContainer">
            {toggleRest
              ? this.onLoading()
              : restaurantsList.map(each => (
                  <Link
                    to={`/restaurant/${each.id}`}
                    className="eachCardLink"
                    items={each}
                  >
                    <Card items={each} />
                  </Link>
                ))}
          </ul>
          <div className="nextRests">
            <button
              className="prevButton"
              onClick={this.previousPage}
              testid="pagination-left-button"
              type="button"
            >
              {pre1}
            </button>
            <p className="pagePara" testid="active-page-number">
              {pageNo} of 4
            </p>
            <button
              className="prevButton"
              onClick={this.nextPage}
              testid="pagination-right-button"
              type="button"
            >
              {nxt1}
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderAllDetails = () => {
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
    return (
      <>
        <Header />
        <div className="homeMainBg">{this.renderAllDetails()}</div>
      </>
    )
  }
}

export default Home
