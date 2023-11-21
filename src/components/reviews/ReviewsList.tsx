import React from 'react'
import { IReview } from './Reviews'
import ReviewsItem from './ReviewsItem'

interface ReviewsListProps {
    reviews: IReview[]
}

// ReviewsList component: displaying course's reviews
const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
      <div>
          {reviews.map((review: IReview) => {
              return <ReviewsItem review={review} key={review._id} />
          })}
    </div>
  )
}

export default ReviewsList