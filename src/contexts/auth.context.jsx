import { createContext, useEffect, useState } from "react"
import authService from './../services/auth.services'

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
    }, [])

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(localStorage.getItem('authToken'))
                .then(({ data }) => {
                    setLoggedUser(data.loggedUser)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        } else {
            logout()
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsLoading(false)
    }

    const storeToken = authToken => localStorage.setItem('authToken', authToken)

    return (
        <AuthContext.Provider value={{ loggedUser, authenticateUser, logout, storeToken, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }