import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import userService from '../../services/user.services'
import { Link, useNavigate } from 'react-router-dom'
import bookingService from '../../services/booking.services'
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel'

import Rating from '../../components/Ratings/Ratings'
import RateUser from '../../components/RateUser/RateUser'


const AccountPage = () => {

    const navigate = useNavigate()
    const { loggedUser, logout } = useContext(AuthContext)
    const { _id: user_id } = loggedUser

    const [userBookingsData, setUserBookingsData] = useState([])

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        role: '',
        rating: [],
        bio: '',
        favorites: []
    })

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {

        Promise.all([userService.user(user_id), bookingService.getAllMyBookings(user_id)])
            .then(result => {
                const userDetails = result[0].data
                const userBookings = result[1].data

                setUserData((prevUserData) => ({ ...prevUserData, ...userDetails }))
                setUserBookingsData([...userBookings])

            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        userService
            .deleteUser(id)
            .then(() => {
                navigate('/users')
            })
            .catch(err => console.log(err))
    }


    const handleDeleteBookingSubmit = (_id) => e => {
        e.preventDefault()
        bookingService
            .deleteBooking(_id)
            .then(() => {
                console.log('Delete booking')
                getUserInfo()
            })
            .catch(err => console.log(err))
    }
    let shouldRenderContent
    if (userData.rating) {
        shouldRenderContent = !userData.rating.some((ratedBy) => ratedBy.userId._id === loggedUser._id)
    }

    return (
        <Container className="AccountPage">
            <Row className='justify-content-center'>
                <Col md={{ span: 6 }} className='text-center'>



                    <img src={userData.avatar} style={{ height: '100px' }} alt={`${userData.firstName} avatar`} />
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <p>{userData.bio}</p>

                    <hr />

                    {
                        !userData.rating
                            ?
                            <p>cargando</p>
                            :
                            userData.rating.map(eachRating => {
                                return (
                                    <Rating rating={eachRating} />
                                )
                            })
                    }

                    {
                        shouldRenderContent ?

                            <RateUser getUserInfo={getUserInfo} toWhereRates={'User'} />

                            :
                            ''
                    }
                    <Link to={`/profile-edit/${userData._id}`} className='btn btn-warning mb-3' style={{ width: '200px' }}>Edit profile</Link>

                    <Form onSubmit={handleFormSubmit} >
                        <Button variant="danger" type="submit" style={{ width: '200px' }}>Delete Profile</Button>
                    </Form>

                </Col>
            </Row >
        </Container >
    )
}

export default AccountPage