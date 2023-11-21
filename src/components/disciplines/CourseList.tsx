import React from 'react'
import { ICourse } from '../courses/Course' 
import { Link } from 'react-router-dom'

// CourseListProps interface: defines the structure of the props for CourseList component.
interface CourseListProps {
    courses: ICourse[]
}

// CourseList component: takes in courses on Discipline page and displays a link to that course.
const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
      <div>
          {courses.map(({ name, slug, _id }) => {
              return <div key={_id}>
                  <Link to={`/courses/${slug}`}>{name}</Link>
              </div>
              
          })}
    </div>
  )
}

export default CourseList