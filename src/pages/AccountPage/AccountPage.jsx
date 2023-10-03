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
                getUserInfo()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className='AccountPage'>
            <Row className="align-items-center my-5">
                <Col md={{ span: 3, offset: 1 }}>
                    <img src={userData.avatar} style={{ height: '200px', width: '200px', borderRadius: '50rem', objectFit: 'cover', border: '4px solid rgb(255, 187, 0)' }} alt={`${userData.firstName} avatar`} />
                </Col>
                <Col md={{ span: 6 }}>
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <p>{userData.bio}</p>
                </Col>
                <Col md={{ span: 2 }} className='align-self-end text-end'>
                    <Link to={`/profile-edit/${userData._id}`} className='btn btn-warning mb-3' style={{ width: '200px' }}>Edit profile</Link>

                    <Form onSubmit={handleFormSubmit} >
                        <Button variant="danger" type="submit" style={{ width: '200px' }}>Delete account</Button>
                    </Form>
                </Col>
            </Row>

            <h1>My bookings</h1>
            <hr />
            <Row>
                {
                    userBookingsData ?
                        userBookingsData.map((eachBooking, idx) => {
                            return (
                                <div key={idx} className='my-4'>
                                    <Row>
                                        <Col>
                                            <h3 className='mb-3'>{eachBooking.room.title}</h3>
                                        </Col>
                                        <Col>
                                            <h5 className='mt-2'>From {eachBooking.bookingDates.entry.split('T')[0]} To {eachBooking.bookingDates.exit.split('T')[0]}</h5>
                                        </Col>
                                        <Col className='text-end'>
                                            <Form onSubmit={handleDeleteBookingSubmit(eachBooking._id)} >
                                                <Button variant="danger" type="submit" style={{ width: '200px' }}>Cancel booking</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <GalleryCarousel gallery={eachBooking.room.gallery} size={'30vh'} />
                                    <br />
                                    <hr />
                                </div>
                            )
                        })
                        :
                        'Loading...'
                }
            </Row>
            <h1 className='mb-4'>My ratings</h1>
            <Row>
                {
                    !userData.rating
                        ?
                        <p>Loading...</p>
                        :
                        userData.rating.map(eachRating => {
                            return (
                                <Col lg={{ span: 4 }}>
                                    <Rating rating={eachRating} />
                                </Col>
                            )
                        })
                }
            </Row >
        </Container>
    )
}

export default AccountPage