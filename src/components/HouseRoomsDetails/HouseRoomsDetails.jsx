import { Row, Col, Form, Button } from 'react-bootstrap'
import houseService from '../../services/house.services'
import roomService from '../../services/room.services'
import { Link, useNavigate } from 'react-router-dom'
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";


import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HOUSE_INITIAL_COORDS } from '../../consts/house.consts';


const HouseRoomsDetails = () => {

    const navigate = useNavigate()
    const { rooms_house_id } = useParams()

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
        owner: '',
        location: {
            coordinates: HOUSE_INITIAL_COORDS
        }
    })

    useEffect(() => {
        getHouseRoomForm()
    }, [])

    const getHouseRoomForm = () => {

        houseService
            .getOneHouseRoom(rooms_house_id)
            .then(({ data: houseRoomDetails }) => {

                let totalScore = 0
                houseRoomDetails.rating.forEach(({ score }) => totalScore += score)
                totalScore = totalScore / houseRoomDetails.rating.length
                houseRoomDetails.totalScore = totalScore
                const updateLocation = { lat: houseRoomDetails.location.coordinates[1], lng: houseRoomDetails.location.coordinates[0] }
                houseRoomDetails.location.coordinates = updateLocation
                setHouseData(houseRoomDetails)
            }
            )
            .catch(err => console.log(err))
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,

    })

    if (!isLoaded) {
        return 'Loading'
    }

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
                    <p>House amenities: </p>
                    {
                        houseData.amenities.map(eachAmenity => {
                            return (
                                <>
                                    <p key={eachAmenity.amenity.name}>{eachAmenity.amenity.name}</p>
                                    <img style={{ height: '20px' }} src={eachAmenity.amenity.icon} alt="icon" />
                                </>
                            )
                        })
                    }

                    {
                        houseData.gallery.map(eachPhoto => {
                            return (
                                <img key={eachPhoto} style={{ height: '100px' }} src={eachPhoto} alt="" />
                            )
                        })
                    }

                    <GoogleMap center={houseData.location.coordinates} zoom={15} mapContainerStyle={{ width: '100%', height: '200px' }} >
                        <MarkerF position={houseData.location.coordinates} />
                        <MarkerF position={{ lat: 40.3930, lng: -3.70357777 }} />
                    </GoogleMap>

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
                                        <br />
                                        <br />
                                        <Link className='btn btn-dark' to={`/booking/${eachRoom._id}`}>Booking</Link>
                                        <br />
                                        <br />
                                        <Form onSubmit={handleFormSubmit(eachRoom._id)} >
                                            <Button variant="danger" type="submit" >Delete</Button>
                                        </Form>
                                        <Link className='btn btn-warning' to={`/rooms-edit/${eachRoom._id}`}>Edit</Link>
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