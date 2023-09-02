import { Row, Col, Form, Button } from 'react-bootstrap'
import houseService from '../../services/house.services'
import roomService from '../../services/room.services'
import { Link, useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


const HouseRoomsDetails = () => {
    const { rooms_house_id } = useParams()

    const getHouseRoomForm = () => {

        houseService
            .getOneHouseRoom(rooms_house_id)
            .then(({ data: houseRoomDetails }) => {

                let totalScore = 0
                houseRoomDetails.rating.forEach(({ score }) => totalScore += score)
                totalScore = totalScore / houseRoomDetails.rating.length
                houseRoomDetails.totalScore = totalScore
                setHouseData(houseRoomDetails)
            }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getHouseRoomForm()
    }, [])

    const navigate = useNavigate()

    const [houseData, setHouseData] = useState({
        title: '',
        gallery: [],
        description: '',
        info: {
            maxGuests: '',
            rooms: '',
            beds: '',
            bathrooms: ''
        },
        price: {
            housePrice: '',
            cleaningPrice: ''
        },

        street: '',
        number: '',
        zipcode: '',
        city: '',
        country: '',
        amenities: [],
        included: '',
        owner: ''
    })


    const handleFormSubmit = (room_id) => e => {

        e.preventDefault()

        roomService
            .deleteRoom(room_id, { house_id: rooms_house_id })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Row>
                <Col>
                    <p>House Title:{houseData.title}</p>
                    <p>House Description:{houseData.description}</p>
                    <p>House Max guests: {houseData.info.maxGuests}</p>
                    <p>House rooms: {houseData.info.rooms}</p>
                    <p>House beds: {houseData.info.beds}</p>
                    <p>House bathrooms: {houseData.info.bathrooms}</p>
                    <p>House price: {houseData.price.housePrice}€ </p>
                    <p>House Cleaning price: {houseData.price.cleaningPrice}€ </p>
                    <p>House Owner: {houseData.owner.firstName} {houseData.owner.lastName} </p>
                    <p>House rating:
                        {
                            !houseData.totalScore ? ' Not rated' : houseData.totalScore
                        }
                    </p>
                    {
                        houseData.gallery.map(eachPhoto => {
                            return (
                                <img key={eachPhoto} style={{ height: '100px' }} src={eachPhoto} alt="" />
                            )
                        })
                    }
                    {
                        houseData.rooms ?
                            houseData.rooms.map(eachRoom => {
                                return (
                                    <div key={eachRoom.title}>
                                        <p>room title:{eachRoom.title}</p>
                                        <p>room description:{eachRoom.description}</p>
                                        <p>bathroom type:{eachRoom.info.bathroom}</p>
                                        <p>Beds: {eachRoom.info.beds}</p>
                                        <p>Max guests: {eachRoom.info.maxGuests}</p>
                                        <p>Room price: {eachRoom.price.roomPrice}</p>
                                        <p>Room cleaning price: {eachRoom.price.cleaningPrice}</p>
                                        {
                                            eachRoom.gallery.map(eachRoomPhoto => {
                                                return (
                                                    <img key={eachRoomPhoto} style={{ height: '100px' }} src={eachRoomPhoto} alt="" />
                                                )
                                            })
                                        }
                                        <Form onSubmit={handleFormSubmit(eachRoom._id)} >
                                            <Button variant="dark" type="submit" >Delete</Button>
                                        </Form>
                                        <Link className='btn btn-dark' to={`/rooms-edit/${eachRoom._id}`}>Edit</Link>
                                    </div>
                                )
                            })
                            :
                            ''
                    }



                </Col>

            </Row >
        </>
    )
}

export default HouseRoomsDetails