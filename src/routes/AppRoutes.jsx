import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import AddAmenityPage from '../pages/AddAmenityPage/AddAmenityPage'
import AddHousePage from '../pages/AddHousePage/AddHousePage'
import AddRoomPage from '../pages/AddRoomPage/AddRoomPage'
import ShowHouseRoomsPage from '../pages/ShowHouseRoomsPage/ShowHouseRoomsPage'
import ShowHousesPage from '../pages/ShowHousesPage/ShowHousesPage'
import ShowHouseRoomsPageDetails from '../pages/ShowHouseRoomsPageDetails/ShowHouseRoomsPageDetails'
import EditHousePage from '../pages/EditHousePage/EditHousePage'
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
                <Route path={'/house-create'} element={<AddHousePage />} />
                <Route path={'/rooms'} element={<ShowHouseRoomsPage />} />
                <Route path={'/houses'} element={<ShowHousesPage />} />
                <Route path={'/rooms-create'} element={<AddRoomPage />} />
                <Route path={'/rooms-edit/:id'} element={<EditRoomPage />} />
                <Route path={'/house-edit/:id'} element={<EditHousePage />} />
                <Route path={'/rooms/:rooms_house_id'} element={<ShowHouseRoomsPageDetails />} />


            </Route>

            {/* <Route path={'*'} element={<NotFoundPage />} /> */}
        </Routes>
    )
}

export default AppRoutes