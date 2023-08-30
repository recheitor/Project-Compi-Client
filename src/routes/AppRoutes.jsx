import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import AddAmenityPage from '../pages/AddAmenityPage/AddAmenityPage'
import AddHousePage from '../pages/AddHousePage/AddHousePage'
import AddRoomPage from '../pages/AddRoomPage/AddRoomPage'
import EditRoomPage from '../pages/EditRoomPage/EditRoomPage'
import AccountPage from '../pages/AccountPage/AccountPage'
import PrivateRoutes from './PrivateRoutes'
// import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />

            <Route element={<PrivateRoutes />}>
                <Route path={'/account'} element={<AccountPage />} />
                <Route path={'/add-amenity'} element={<AddAmenityPage />} />
                <Route path={'/add-your-house'} element={<AddHousePage />} />
                <Route path={'/rooms-create'} element={<AddRoomPage />} />
                <Route path={'/rooms-edit/:id'} element={<EditRoomPage />} />

            </Route>

            {/* <Route path={'*'} element={<NotFoundPage />} /> */}
        </Routes>
    )
}

export default AppRoutes