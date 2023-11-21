import Input from "../UI/Input"
import Button from "../UI/Button"
import useAuthForms, { SignupForm } from "../../hooks/auth/useAuthForms"
import { IsValidSignupFields } from "../../hooks/auth/useAuthFormValidation"
import errorMessage from "../../utils/errorMessage"
import useAuthFormValidation from "../../hooks/auth/useAuthFormValidation"

const Signup = () => {
  // Extract form state and handler functions from custom hook.
  const {
    credentials,
    signupError,
    isSignupError,
    isSignupLoading,
    handleFormSubmit,
    handleChanges,
  } = useAuthForms("Signup")

  // Typecast credentials as signup form fields and extract the individual fields.
  const signupCredentials = credentials as SignupForm
  const { email, name, password, confirmPassword } = signupCredentials

  // State and handlers for form validity from another custom hook, based on current credentials.
  const { validateField, isValidFields, isValidForm } = useAuthFormValidation(
    "Signup",
    signupCredentials
  )

  // Extract individual field validity states.
  const { isValidEmail, isValidPassword, isValidConfirmPassword, isValidName } =
    isValidFields as IsValidSignupFields

  // Display loading screen during signup process.
  if (isSignupLoading) return <p>loading...</p>

  return (
    <fieldset>
      <legend>signup</legend>
      <form onSubmit={handleFormSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          isInvalid={!isValidEmail}
          isInvalidMessage="Must be a valid email"
          onChange={handleChanges}
          onKeyUp={validateField}
          onBlur={validateField}
        />
        <Input
          name="name"
          value={name}
          placeholder="Enter your name"
          isInvalid={!isValidName}
          isInvalidMessage="Name must be at least 1 character long"
          onChange={handleChanges}
          onKeyUp={validateField}
          onBlur={validateField}
        />
        <Input
          name="password"
          value={password}
          type="password"
          placeholder="Enter your password"
          isInvalid={!isValidPassword}
          isInvalidMessage="Password must contain an uppercase, lowercase and numerical
            character and be 6 characters long"
          onChange={handleChanges}
          onKeyUp={validateField}
          onBlur={validateField}
        />
        <Input
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          placeholder="Confirm your password"
          isInvalid={!isValidConfirmPassword}
          isInvalidMessage="Password must contain an uppercase, lowercase and numerical
            character and be 6 characters long"
          onChange={handleChanges}
          onKeyUp={validateField}
          onBlur={validateField}
        />
        {/* Signup button, disabled if form is invalid.*/}
        <Button type="submit" disabled={!isValidForm}>
          Signup
        </Button>
      </form>
      {/* Error message display. */}
      {isSignupError ? <p>{errorMessage(signupError)}</p> : null}
    </fieldset>
  )
}

export default Signup
