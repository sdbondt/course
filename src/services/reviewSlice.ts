import { IReview } from "../components/reviews/Reviews";
import { api } from "./api";

// GetReviewsQuery interface: defines the return value of the getReviews query.
interface GetReviewsQuery {
    reviews: IReview[],
    page: number;
    limit: number;
}


interface CreateReviewQueryParams {
    slug: string;
    content: string;
    rating: number;
}

const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<GetReviewsQuery, string>({
            query: (slug) => `/courses/${slug}/reviews`
        }),
        createReview: builder.mutation<IReview, CreateReviewQueryParams>({
            query: ({ slug, content, rating }) => ({
                url: `/courses/${slug}/reviews`,
                method: 'POST',
                body: {
                    content,
                    rating
                }
            })
        })
    })
})

export const { useGetReviewsQuery, useCreateReviewMutation }  = extendedApiSlice