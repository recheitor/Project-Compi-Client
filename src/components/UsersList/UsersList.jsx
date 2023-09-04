import { Row, Col } from 'react-bootstrap'
import userServices from '../../services/user.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UsersList = () => {

    const [usersListData, setUsersListData] = useState([{
        firstName: '',
        lastName: '',
        avatar: '',
        rating: []
    }])

    useEffect(() => {
        getUsersList()
    }, [])

    const getUsersList = () => {

        userServices
            .users()
            .then(({ data: usersList }) => {
                usersList.forEach(eachUser => {
                    let totalScore = 0
                    eachUser.rating.forEach(({ score }) => totalScore += score)
                    totalScore = totalScore / eachUser.rating.length
                    eachUser.rating.length !== 0 ?
                        eachUser.totalScore = totalScore
                        :
                        eachUser.totalScore = 0
                })
                setUsersListData(usersList)
            })
            .catch(err => console.log(err))
    }

    return (
        <Row>
            <Col >
                {
                    usersListData ?
                        usersListData.map((eachUserData, idx) => {
                            return (
                                <div key={idx}>
                                    <h2>{eachUserData.firstName} {eachUserData.lastName} | Score: {eachUserData.totalScore}</h2>
                                    <img src={eachUserData.avatar} alt="" style={{ height: '100px' }} />
                                    <br />
                                    <br />
                                    <Link to={`/user/${eachUserData._id}`} className='btn btn-dark'>Details</Link>
                                    <hr />
                                    {/* {
                                    eachUserData.rating.map(eachRating => {
                                        return (
                                            <div key={eachRating._id}>
                                                <ul>
                                                    <li>{eachRating.score}</li>
                                                    <li>{eachRating.userId.firstName} {eachRating.userId.lastName}</li>
                                                    <li>{eachRating.comment}</li>
                                                </ul>
                                                <hr />
                                            </div>
                                        )
                                    })
                                } */}
                                </div>
                            )
                        })
                        :
                        <h1>Loading...</h1>
                }
            </Col>
        </Row>
    )
}

export default UsersList