import { Row, Col, Form, Button } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import roomServices from '../../services/room.services'
import bookingServices from '../../services/booking.services'


import { Link, useNavigate } from 'react-router-dom'
import { useJsApiLoader } from "@react-google-maps/api";


import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HOUSE_INITIAL_COORDS } from '../../consts/house.consts';
import Map from '../../components/Map/Map'
import updateHouseRoomsDetails from "../../utils/updateDetails.utils";


const HouseRoomsDetails = () => {

    const navigate = useNavigate()
    const { rooms_house_id } = useParams()
    const markerClick = () => {
        alert('Hi')
    }
    let label = ''
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

        houseServices
            .getOneHouseRoom(rooms_house_id)
            .then(({ data: houseRoomDetails }) => {
                setHouseData(updateHouseRoomsDetails(houseRoomDetails))
            })

        bookingServices
            .getAllRoomBookings(rooms_house_id)
            .then(({ data }) => {
                setAllBookingsData(data)
            })
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

        roomServices
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

                    {
                        !houseData.price.housePrice
                            ? <p>cargando</p>
                            :
                            <Map houseData={[houseData]} zoom={15} />
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

                                        {

                                            eachRoom.bookings.map(eachBooking => {
                                                const fechaEntradaStr = eachBooking.bookingDates.entry
                                                const fechaSalidaStr = eachBooking.bookingDates.exit

                                                const fechaEntrada = new Date(fechaEntradaStr);
                                                const fechaSalida = new Date(fechaSalidaStr);

                                                const fechaActual = new Date();

                                                return (
                                                    (fechaActual >= fechaEntrada && fechaActual <= fechaSalida) &&
                                                    <p>Living: {eachBooking.user.firstName} until: {eachBooking.bookingDates.exit}</p>
                                                )

                                            })
                                        }
                                        <br />
                                        <br />
                                        <Link className='btn btn-dark' disabled={true} to={`/booking/${eachRoom._id}`}>Booking</Link>
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