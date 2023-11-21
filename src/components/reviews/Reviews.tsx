import React from "react"
import { useParams } from "react-router-dom"
import { useGetReviewsQuery } from "../../services/reviewSlice"
import ReviewsList from "./ReviewsList"
import errorMessage from "../../utils/errorMessage"

// IReview interface defines the structure of a review.
export interface IReview {
  _id: string
  comment: string
  rating: number
}

// Reviews component: displays a course's reviews.
const Reviews = () => {
  // Fetch the slug from url params.
  const { slug } = useParams<{ slug: string }>()
  // Get the reviews and state from rtk query hook.
  const { data: { reviews } = {}, error, isError } = useGetReviewsQuery(slug!)

  // Return no reviews when there aren't any.
  if (!reviews || reviews.length === 0) return <p>No reviews yet</p>
  return (
    <div>
      <ReviewsList reviews={reviews} />
      {isError ? <p>{errorMessage(error)}</p> : null}
    </div>
  )
}

export default Reviews
