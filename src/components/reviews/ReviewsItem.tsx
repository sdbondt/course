import React from 'react'
import { IReview } from './Reviews'

// ReviewsItemProps: define the structure of the Reviews Item props
interface ReviewsItemProps {
    review: IReview;
}

// ReviewsItem component: display a singe review out of the ReviewsList component
// Takes a singe review as a prop
const ReviewsItem: React.FC<ReviewsItemProps> = ({ review: { rating, comment}}) => {
  return (
      <div>
          <p>comment: {comment}</p>
          <p>rating: {rating}</p>
    </div>
  )
}

export default ReviewsItem