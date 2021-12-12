import {FaStar, FaRupeeSign} from 'react-icons/fa'

import './index.css'

const RestBanner = props => {
  const {items} = props
  console.log(items)
  return (
    <div className="restBannerBg">
      <img src={items.imageUrl} className="bannerImg" alt="restaurant" />
      <div className="restBannerContent">
        <h1 className="restBannerHead">{items.name}</h1>
        <p className="restBannerAddress">{items.cuisine}</p>
        <p className="restBannerAddress">{items.location}</p>
        <div className="restBannerRatingCostBg">
          <div className="restBannerRating">
            <div className="restBannerOnlyRating">
              <FaStar className="restBannerStarImg" />
              <p className="restBannerStarValue">{items.rating}</p>
            </div>
            <p className="restBannerTotalRatings">
              {items.reviewsCount}+ Ratings
            </p>
          </div>
          <div className="restBannerRating">
            <div className="restBannerOnlyRating">
              <FaRupeeSign className="restBannerStarImg" />
              <p className="restBannerStarValue">{items.costForTwo}</p>
            </div>
            <p className="restBannerTotalRatings">Cost for two</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestBanner
