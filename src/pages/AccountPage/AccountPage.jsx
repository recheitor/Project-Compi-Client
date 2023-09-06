import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import userService from '../../services/user.services'
import { Link, useNavigate } from 'react-router-dom'
import bookingService from '../../services/booking.services'
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel'

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

    const handleDeleteUserSubmit = e => {
        e.preventDefault()
        userService
            .deleteUser(user_id)
            .then(() => {
                logout()
                navigate('/')
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

    return (
        <Container className="AccountPage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>

                    <h1>{userData.firstName}'s account</h1>

                    <Link to={`/profile-edit/${userData._id}`} className='btn btn-warning d-block' style={{ width: '200px' }}>Edit profile</Link>
                    <Form onSubmit={handleDeleteUserSubmit} >
                        <Button variant="danger" type="submit" style={{ width: '200px' }}>Delete</Button>
                    </Form>

                    <img src={userData.avatar} style={{ height: '100px' }} alt={`${userData.firstName} avatar`} />
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <h2>{userData.email}</h2>
                    <p>{userData.bio}</p>

                    <hr />

                    <h3>Favs:</h3>
                    <ul>
                        {
                            userData.favorites.map(({ title }, idx) => {
                                return (
                                    <li key={idx}>{title}</li>
                                )
                            })
                        }
                    </ul>
                    <hr />

                    <h3>Ratings:</h3>
                    <br />
                    {
                        userData.rating.map(({ score, userId, comment }, idx) => {
                            return (
                                <div key={idx}>
                                    <ul>
                                        <li>{score}</li>
                                        <li>{userId.firstName} {userId.lastName}</li>
                                        <li>{comment}</li>
                                    </ul>
                                    <hr />
                                </div>
                            )
                        })
                    }

                    <br />

                    <h3>Bookings:</h3>
                    <br />
                    {
                        userBookingsData.map((eachBooking, idx) => {

                            eachBooking.bookingDates.entry = eachBooking.bookingDates.entry.split('T')[0]
                            eachBooking.bookingDates.exit = eachBooking.bookingDates.exit.split('T')[0]

                            return (
                                <div key={idx}>
                                    <figure style={{ width: '100%' }} >
                                        <GalleryCarousel gallery={eachBooking.room.gallery} />
                                    </figure>
                                    <h3>Room: {eachBooking.room.title}</h3>
                                    <ul>
                                        <li>Entry: {eachBooking.bookingDates.entry}</li>
                                        <li>Exit: {eachBooking.bookingDates.exit}</li>
                                    </ul>
                                    <h4>Price: {eachBooking.price}</h4>

                                    <Form onSubmit={handleDeleteBookingSubmit(eachBooking._id)} >
                                        <Button variant="danger" type="submit" style={{ width: '200px' }}>Cancel Booking</Button>
                                    </Form>

                                    <hr />
                                </div>
                            )
                        })
                    }
                </Col>
            </Row >
        </Container >
    )
}

export default AccountPage