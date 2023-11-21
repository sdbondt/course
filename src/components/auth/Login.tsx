import errorMessage from "../../utils/errorMessage"
import Input from "../UI/Input"
import Button from "../UI/Button"
import useAuthForms from "../../hooks/auth/useAuthForms"
import useAuthFormValidation from "../../hooks/auth/useAuthFormValidation"

const Login = () => {
  // Extract form state and handlers from custom hook.
  const {
    credentials,
    isLoginError,
    isLoginLoading,
    loginError,
    handleFormSubmit,
    handleChanges,
  } = useAuthForms("Login")

  // Extract state and handler for form validity from custom hook, based on current credentials.
  const { validateField, isValidForm, isValidFields } = useAuthFormValidation(
    "Login",
    credentials
  )
    
    // Extract validity for indiviual form fields.
  const { isValidEmail, isValidPassword } = isValidFields

  // Display loading screen during login process.
  if (isLoginLoading) return <p>loading...</p>
  
  return (
    <fieldset>
      <legend>login</legend>
      <form onSubmit={handleFormSubmit}>
        <Input
          name="email"
          type="email"
          value={credentials.email}
          placeholder="Enter your email"
          isInvalid={!isValidEmail}
          isInvalidMessage="Must be a valid email"
          onChange={handleChanges}
          onKeyUp={validateField}
          onBlur={validateField}
        />
        <Input
          name="password"
          type="password"
          value={credentials.password}
          placeholder="Enter your password"
          isInvalid={!isValidPassword}
          isInvalidMessage="Password must contain an uppercase, lowercase and numerical
            character and be 6 characters long"
          onChange={handleChanges}
          onKeyUp={validateField}
          onBlur={validateField}
        />
        {/* Login Button, disabled if form is invalid. */}
        <Button type="submit" disabled={!isValidForm}>
          Login
        </Button>
      </form>
      {/* Error message display. */}
      {isLoginError ? <p>{errorMessage(loginError)}</p> : null}
    </fieldset>
  )
}

export default Login
