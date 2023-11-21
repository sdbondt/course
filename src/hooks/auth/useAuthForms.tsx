import { useReducer, } from "react"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"
import {
  setToken,
  useLoginMutation,
  useSignupMutation,
} from "../../services/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// Form Type: either a login or signup form
export type FormType = "Login" | "Signup"

// Form interfaces: structure of the signup and login forms
export interface SignupForm {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export interface LoginForm {
  email: string
  password: string
}

// credentialsReducer: Reducer function for updating form states.
const credentialsReducer = (
  state: LoginForm | SignupForm,
  payload: Partial<SignupForm> | Partial<LoginForm>
) => ({ ...state, ...payload })

// Initial state definitions for signup and login forms.
const initialSignupState: SignupForm = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
}

const initialLoginState: LoginForm = {
  email: "",
  password: "",
}

// useAuthForms: custom hook form updating and submitting authentication forms
// takes either a 'Login' or 'Signup' type as an argument
const useAuthForms = (type: FormType) => {
  // set initial state based on the form type, more fields exist on a signup form.
  const initialState =
    type === "Signup" ? initialSignupState : initialLoginState

  // state and dispatcher for authentication form credentials.
  const [credentials, dispatchCredentials] = useReducer(
    credentialsReducer,
    initialState
  )

  // Hooks for signup and login mutations using Redux Toolkit Query.
  const [
    signup,
    { error: signupError, isLoading: isSignupLoading, isError: isSignupError },
  ] = useSignupMutation()
  const [
    login,
    { isError: isLoginError, isLoading: isLoginLoading, error: loginError },
  ] = useLoginMutation()

  // useDispatch and useNavigate hooks from React-Redux and React-Router-Dom respectively.
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // handleChanges: function that will update the form fields.
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatchCredentials({
      [name]: value,
    })
  }
   
  // handleFormSubmit: Async function to handle form submission.
  // It triggers the appropriate mutation based on the form type and navigates upon successful login/signup.
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res:
      | { data?: { token: string } }
      | { error: FetchBaseQueryError | SerializedError } = {}

    if (type === "Signup") res = await signup(credentials)
    if (type === "Login") res = await login(credentials)

    if ("data" in res && res.data) {
      dispatch(setToken(res.data.token))
      navigate("/")
    }
  }

  return {
    handleChanges,
    handleFormSubmit,
    credentials,
    isSignupError,
    isSignupLoading,
    signupError,
    isLoginError,
    isLoginLoading,
    loginError,
  }
}

export default useAuthForms
