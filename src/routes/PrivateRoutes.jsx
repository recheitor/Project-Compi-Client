import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
// import Loader from "../components/Loader/Loader"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoutes = () => {

    const { loggedUser, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return (
            <h1>Loading...</h1>
            // <Loader />
        )
    }

    if (!loggedUser) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoutes