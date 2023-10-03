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


    return (
        <>
            <Row className="AccountPage align-items-center my-5">
                <Col md={{ span: 3 }}>
                    <img src={userData.avatar} style={{ height: '20rem', width: '20rem', borderRadius: '50rem', objectFit: 'cover', border: '4px solid rgb(255, 187, 0)' }} alt={`${userData.firstName} avatar`} />
                </Col>
                <Col md={{ span: 6 }} style={{ marginLeft: '2rem' }}>
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <p>{userData.bio}</p>
                </Col>
                <Col md={{ span: 2 }} className='align-self-end text-end'>
                    <Form onSubmit={handleFormSubmit} >
                        <Button variant="danger" type="submit" style={{ width: '200px' }}>Delete account</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {
                    !userData.rating
                        ?
                        <p>Loading...</p>
                        :
                        userData.rating.map(eachRating => {
                            return (
                                <Col lg={{ span: 4 }} className='mt-5'>

                                    <Rating rating={eachRating} />
                                </Col>

                            )
                        })
                }

                {
                    shouldRenderContent &&
                    <>
                        <h2 className='mt-2 mb-4'>Rate this user!</h2>
                        <Col lg={{ span: 4 }}>
                            <RateUser getUserInfo={getUserInfo} toWhereRates={'User'} />
                        </Col>
                    </>
                }
            </Row >
        </>
    )
}

export default UserDetails