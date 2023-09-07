import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import userService from '../../services/user.services'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '../../components/Ratings/Ratings'
import RateUser from '../RateUser/RateUser'




const UserDetails = () => {

    const navigate = useNavigate()
    const { loggedUser } = useContext(AuthContext)
    const { id } = useParams()



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
    }, [id])

    const getUserInfo = () => {

        userService
            .user(id)
            .then(({ data: userDetails }) => {
                setUserData({ ...userDetails })
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

    let shouldRenderContent
    if (userData.rating) {
        shouldRenderContent = !userData.rating.some((ratedBy) => ratedBy.userId._id === loggedUser._id)
    }
    console.log(shouldRenderContent)

    return (
        <Container className="AccountPage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>

                    <Form onSubmit={handleFormSubmit} >
                        <Button variant="danger" type="submit" style={{ width: '200px' }}>Delete</Button>
                    </Form>

                    <h1>{userData.firstName}'s account</h1>

                    <img src={userData.avatar} style={{ height: '100px' }} alt={`${userData.firstName} avatar`} />
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <h2>{userData.email}</h2>
                    <p>{userData.bio}</p>

                    <hr />


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
                            <p>USER ALREADY RATED THIS USER</p>
                    }

                </Col>
            </Row >
        </Container >
    )
}

export default UserDetails