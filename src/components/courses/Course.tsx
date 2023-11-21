import { useParams } from "react-router-dom"
import { useGetCourseQuery } from "../../services/courseSlice"
import errorMessage from "../../utils/errorMessage"
import { IDiscipline } from "../disciplines/Disciplines"
import Reviews from "../reviews/Reviews"
import ReviewForm from "../reviews/ReviewForm"

// ICourse interface for the structure of a course document.
export interface ICourse {
  _id: string
  name: string
  slug: string
  cost: number
  averageRating: number
  discipline: IDiscipline
}

const Course = () => {
  // Extract the slug out of the url params
  const { slug } = useParams<{ slug: string }>()
  // Fetch the course and state with rtk query.
  const {
    data: { course } = {},
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetCourseQuery(slug!)

  // Return loading page.
  if (isLoading || isFetching) return <p>loading...</p>
  // Return not found page when there is no course.
  if (!course) return <p>No course found with that name.</p>

  return (
    <div>
      <p>
        {course.name} ({course.discipline.name})
      </p>
      <p>cost: {course.cost}</p>
      <p>rating: {course.averageRating}</p>
      <ReviewForm />
      <Reviews />
      {isError ? errorMessage(error) : null}
    </div>
  )
}

export default Course
