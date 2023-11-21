import { useParams } from "react-router-dom"
import { useGetDisciplineQuery } from "../services/disciplineSlice"
import errorMessage from "../utils/errorMessage"
import CourseList from "../components/disciplines/CourseList"

// Discipline component: displayed on /disciplines/:slug.
const Discipline = () => {
  // fetch the slug from the url route
  const { slug } = useParams<{ slug: string }>()
  // Etract discipline, courses and state from rtk query hook
  const {
    data: { discipline, courses } = {},
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetDisciplineQuery(slug!)

  // Display loading page.
  if (isLoading || isFetching) return <p>Loading...</p>
  // Return nothing found page when slug doesn't correspond to a course.
  if (!discipline) return <p>Nothing found...</p>

  return (
    <div>
      <p>{discipline.name}</p>
      {courses ? <CourseList courses={courses} /> : <p>No courses found</p>}
      { isError ? <p>{errorMessage(error)}</p>: null}
    </div>
  )
}

export default Discipline
