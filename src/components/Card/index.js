import {AiFillStar} from 'react-icons/ai'

import './index.css'

const Card = props => {
  const {items} = props
  if (items === undefined) {
    return null
  }

  return (
    <li testid="restaurant-item" className="cardsContainerLi">
      <div className="cardContainer">
        <img src={items.imageUrl} className="restImg" alt="restaurant" />
        <div className="restContent">
          <h1 className="restCardHead">{items.name}</h1>
          <p className="restCardPara">{items.cuisine}</p>
          <div className="restRatingContainer">
            <AiFillStar className="starSize" />
            <p className="starPara">{items.rating}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Card
