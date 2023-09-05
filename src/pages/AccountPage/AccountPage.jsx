import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import userService from '../../services/user.services'
import { Link, useNavigate } from 'react-router-dom'

const AccountPage = () => {

    const navigate = useNavigate()
    const { loggedUser, logout } = useContext(AuthContext)
    const { _id: user_id } = loggedUser

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

        userService
            .user(user_id)
            .then(({ data: userDetails }) => {
                setUserData((prevUserData) => ({ ...prevUserData, ...userDetails }))
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        userService
            .deleteUser(user_id)
            .then(() => {
                logout()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="AccountPage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>

                    <h1>{userData.firstName}'s account</h1>

                    <Link to={`/profile-edit/${userData._id}`} className='btn btn-warning d-block' style={{ width: '200px' }}>Edit profile</Link>
                    <Form onSubmit={handleFormSubmit} >
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
                </Col>
            </Row >
        </Container >
    )
}

export default AccountPage