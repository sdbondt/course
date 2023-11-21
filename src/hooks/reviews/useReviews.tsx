import { useReducer } from "react";
import { useCreateReviewMutation } from "../../services/reviewSlice"
import { useParams } from "react-router-dom";

interface ReviewForm {
    rating: number;
    content: string
}

const reviewForm = {
    rating: 10,
    content: ''
}

const reducer = (state: ReviewForm, payload: Partial<ReviewForm> ) => ({...state, ...payload })

const useReviews = () => {
    const [reviewsForm, dispatchReviewsForm] = useReducer(reducer, reviewForm)
    const [createReview, { isError, error, isLoading}] = useCreateReviewMutation()

    const { slug } = useParams<{slug: string}>()

    const handleChanges = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => dispatchReviewsForm({
        [e.target.name]: e.target.value
    })

    const handleSubmit = () => {
        if(slug) createReview({
            ...reviewsForm,
            slug
        })
    }

    return { reviewsForm, isError, error, isLoading, createReview, handleChanges, handleSubmit }
}

export default useReviews