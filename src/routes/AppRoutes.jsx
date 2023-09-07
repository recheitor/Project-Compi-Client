import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import AddAmenityPage from '../pages/AddAmenityPage/AddAmenityPage'
import AddHousePage from '../pages/AddHousePage/AddHousePage'
import AddRoomPage from '../pages/AddRoomPage/AddRoomPage'
import ShowHouseRoomsPage from '../pages/ShowHouseRoomsPage/ShowHouseRoomsPage'
import ShowHouseRoomsPageDetails from '../pages/ShowHouseRoomsPageDetails/ShowHouseRoomsPageDetails'
import EditHousePage from '../pages/EditHousePage/EditHousePage'
import EditRoomPage from '../pages/EditRoomPage/EditRoomPage'
import AccountPage from '../pages/AccountPage/AccountPage'
import PrivateRoutes from './PrivateRoutes'
import EditProfilePage from '../pages/EditProfilePage/EditProfilePage'
import UsersListPage from '../pages/UsersListPage/UsersListPage'
import UserDetailsPage from '../pages/UserDetailsPage/UserDetailsPage'
import BookingPage from '../pages/BookingPage/BookingPage'

// import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/rooms'} element={<ShowHouseRoomsPage />} />


            <Route element={<PrivateRoutes />}>
                <Route path={'/account'} element={<AccountPage />} />
                <Route path={'/profile-edit/:id'} element={<EditProfilePage />} />
                <Route path={'/users'} element={<UsersListPage />} />
                <Route path={'/user/:id'} element={<UserDetailsPage />} />
                <Route path={'/add-amenity'} element={<AddAmenityPage />} />

                <Route path={'/house-create'} element={<AddHousePage />} />
                <Route path={'/house-edit/:id'} element={<EditHousePage />} />

                <Route path={'/rooms/:rooms_house_id'} element={<ShowHouseRoomsPageDetails />} />
                <Route path={'/rooms-create'} element={<AddRoomPage />} />
                <Route path={'/rooms-edit/:id'} element={<EditRoomPage />} />

                <Route path={'/booking/:rooms_house_id'} element={<BookingPage />} />
            </Route>

            {/* <Route path={'*'} element={<NotFoundPage />} /> */}
        </Routes>
    )
}

export default AppRoutes