import { useState } from 'react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import Button from '../components/UI/Button'


const Auth = () => {
    const [showLogin, setShowLogin] = useState(true)
    const toggleComponent = () => setShowLogin((val) => !val)

    return (
        <>
            {showLogin ? <Login /> : <Signup />}
            <Button onClick={toggleComponent}>Switch to { showLogin ? 'Signup': 'Login'}</Button>
        </>
    
  )
}

export default Auth