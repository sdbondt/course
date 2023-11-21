import { useEffect, ReactNode } from "react"
import { createBrowserRouter, useNavigate } from "react-router-dom"
import Auth from "../views/Auth"
import Home from "../views/Home"
import { useSelector } from "react-redux"
import { getToken } from "../services/authSlice"
import Discipline from "../views/Discipline"
import Course from "../components/courses/Course"

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector(getToken)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) navigate("/auth")
  }, [token, navigate])
  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
    {
        path: '/',
      element: (
        <PrivateRoute>
          <Home />
          </PrivateRoute>
        )
  },
  {
    path: '/disciplines/:slug',
    element: (
      <PrivateRoute>
        <Discipline />
      </PrivateRoute>
    )
  },
  {
    path: '/courses/:slug',
    element: (
      <PrivateRoute>
        <Course />
      </PrivateRoute>
    )
  }
])

export default router
