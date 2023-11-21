import { ICourse } from "../components/courses/Course";
import { IReview } from "../components/reviews/Reviews";
import { api } from "./api";

// CourseQuery interface defines the return value of getCourse query.
interface CourseQuery {
    course: ICourse;
    reviews: IReview[]
}

const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCourse: builder.query<CourseQuery, string>({
            query: (slug) => `/courses/${slug}`
        })
    })
})

export const { useGetCourseQuery } = extendedApiSlice