import React from "react"
import useReviews from "../../hooks/reviews/useReviews"
import Button from "../UI/Button"
import errorMessage from "../../utils/errorMessage"

const ReviewForm = () => {
    const { reviewsForm, handleChanges, handleSubmit, isError, error } = useReviews()
  return (
      <form onSubmit={handleSubmit}>
          {isError && <p>{errorMessage(error)}</p> }
      <legend>Share your opinion</legend>
      <textarea name="content" value={reviewsForm.content} onChange={handleChanges} placeholder="Add your review here"></textarea>
      <label>
        Score:
        <select value={reviewsForm.rating} onChange={handleChanges}>
          {[...Array(10)].map((_, num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
          </label>
          <Button type="submit">Add your review</Button>
    </form>
  )
}

export default ReviewForm
