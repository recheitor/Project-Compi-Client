import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import userService from '../../services/user.services'
import { useNavigate, useParams } from 'react-router-dom'

const UserDetailsPage = () => {

    const { loggedUser } = useContext(AuthContext)
    const { id } = useParams()

    const navigate = useNavigate()

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

    useEffect(() => {
        getUserInfo()
    }, [])

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

                    <h3>Favs:</h3>
                    <ul>
                        {
                            userData.favorites.map((eachFav, idx) => {
                                return (
                                    <li key={idx}>{eachFav.title}</li>
                                )
                            })
                        }
                    </ul>
                    <hr />

                    <h3>Ratings:</h3>
                    <br />
                    {
                        userData.rating.map((eachRating, idx) => {
                            return (
                                <div key={idx}>
                                    <ul>
                                        <li>{eachRating.score}</li>
                                        <li>{eachRating.userId.firstName} {eachRating.userId.lastName}</li>
                                        <li>{eachRating.comment}</li>
                                    </ul>
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

export default UserDetailsPage