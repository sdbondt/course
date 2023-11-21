import { useReducer, useMemo } from "react"
import { validateEmail, validatePassword } from "../../utils/validators"
import { FormType, LoginForm, SignupForm } from "./useAuthForms"

// Interface definitions for validation states of login and signup forms.
export interface IsValidLoginFields {
  isValidEmail: boolean
  isValidPassword: boolean
}

export interface IsValidSignupFields {
  isValidEmail: boolean
  isValidName: boolean
  isValidPassword: boolean
  isValidConfirmPassword: boolean
}

// Initial state definitions for the validity of the fields of signup or login forms.
const isValidSignupFields = {
  isValidName: true,
  isValidEmail: true,
  isValidPassword: true,
  isValidConfirmPassword: true,
}

const isValidLoginFields = {
  isValidEmail: true,
  isValidPassword: true,
}

type Fields = 'email' | 'name' | 'password' | 'confirmPassword'

// FieldValidityAction interface: Defines the structure of actions for updating form field validity.
// Takes in field argument for form field and a payload argument for it's value
interface FieldValidityAction {
  field: Fields
  payload: Partial<LoginForm> | Partial<SignupForm>
}

// isValidFieldsReducer: Reducer function for updating the validation state of form fields.
const isValidFieldsReducer = (
  state: IsValidLoginFields | IsValidSignupFields,
  action: FieldValidityAction
) => {
  const { payload, field } = action
  const { email, password, confirmPassword, name } = payload as SignupForm

  if (field === "email")
    return {
      ...state,
      isValidEmail: validateEmail(email),
    }

  if (field === "password")
    return {
      ...state,
      isValidPassword: validatePassword(password),
    }
  
    
  if (field === "confirmPassword")
    return {
      ...state,
      isValidConfirmPassword: validatePassword(confirmPassword),
    }

  if (field === "name")
    return {
      ...state,
      isValidName: name.length > 0,
    }

  return state
}

// useAuthFormValidation: Custom hook for handling form field validation.
// It takes the form type and current credentials from the form as arguments.
const useAuthFormValidation = (
  type: FormType,
  credentials: SignupForm | LoginForm
) => {
  // Determine initial validation state based on form type.
  const initialFormFields =
    type === "Signup" ? isValidSignupFields : isValidLoginFields

  // State and dispatcher for form field validity.
  const [isValidFields, dispatchIsValidFields] = useReducer(
    isValidFieldsReducer,
    initialFormFields
  )
  
  // validatesField: take in an change or keyUp event and dispatches a field validity check
  const validateField = (event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    dispatchIsValidFields({
      field: name as Fields,
      payload: {
        [name]: value
      }
    })
  }
  
  // isValidForm: Memoized value to determine if the entire form is valid.
  const isValidForm = useMemo(() => {
    const fieldsAreValid = Object.values(isValidFields).every(
      (value) => value === true
    )
    const fieldsAreTouched = Object.values(credentials).every(
      (value) => value.length > 0
    )
    return fieldsAreTouched && fieldsAreValid
  }, [credentials, isValidFields])

  return { validateField, isValidFields, isValidForm }
}

export default useAuthFormValidation
