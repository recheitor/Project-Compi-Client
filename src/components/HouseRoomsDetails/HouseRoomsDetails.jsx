import { Row, Col, Form, Button } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import roomServices from '../../services/room.services'
import bookingServices from '../../services/booking.services'
import ratingService from '../../services/rating.services'
import { AuthContext } from '../../contexts/auth.context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState, useContext } from 'react'
import { HOUSE_INITIAL_COORDS } from '../../consts/house.consts';
import MapDetails from '../../components/MapDetails/MapDetails'
import updateHouseRoomsDetails from "../../utils/updateDetails.utils";
import Rating from '../Ratings/Ratings'
import RateHouse from '../RateHouse/RateHouse'
import GalleryCarousel from '../GalleryCarousel/GalleryCarousel'


const HouseRoomsDetails = () => {
    const { loggedUser } = useContext(AuthContext)

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

        houseServices
            .getOneHouseRoom(rooms_house_id)
            .then(({ data: houseRoomDetails }) => {
                setHouseData(updateHouseRoomsDetails(houseRoomDetails))
            })

        bookingServices
            .getAllRoomBookings(rooms_house_id)
            .then(({ data }) => {
                // setAllBookingsData(data)
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

    let shouldRenderContent
    if (houseData.rating) {
        shouldRenderContent = !houseData.rating.some((ratedBy) => ratedBy.userId === loggedUser._id);
    }

    return (
        <>
            <Row>
                <Col>

                    {houseData.title ?
                        <>
                            <h1>{houseData.title}</h1>
                            <h2>{houseData.address.city}, {houseData.address.country}</h2>
                            {
                                houseData.totalScore &&
                                <p>★ {houseData.totalScore}</p>
                            }

                            <h4>Hosted by {houseData.owner.firstName} {houseData.owner.lastName} </h4>
                            <div className="price-container">
                                <h3>€ {houseData.price.housePrice}</h3>
                                <span> night</span>
                            </div>

                            <GalleryCarousel gallery={houseData.gallery} size={'70vh'} />

                            <br />
                            <div className="description">
                                <p>{houseData.description}</p>
                            </div>

                            <hr />

                            <div className="house-info">
                                <h4>House info: </h4>
                                <ul>
                                    <li>{houseData.info.maxGuests} guest</li>
                                    <li>{houseData.info.rooms} rooms</li>
                                    <li>{houseData.info.beds} beds</li>
                                    <li>{houseData.info.bathrooms} bathrooms</li>
                                </ul>
                            </div>

                            <p>House Cleaning price: {houseData.price.cleaningPrice}€ </p>

                            <p>House amenities: </p>
                        </>
                        :
                        'Loading...'}
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
                        houseData.rooms &&
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
                                    {
                                        shouldRenderContent ?
                                            <RateHouse getHouseRoomForm={getHouseRoomForm} toWhereRates={'House'} />
                                            :
                                            <p>USER ALREADY RATED THIS HOUSE</p>
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
                    }

                    {
                        !houseData.rating
                            ?
                            <p>cargando</p>
                            :
                            houseData.rating.map(eachRating => {
                                return (
                                    <Rating rating={eachRating} />
                                )
                            })
                    }

                    <MapDetails houseData={[houseData]} zoom={15} />
                </Col>
            </Row >
        </>
    )
}

export default HouseRoomsDetails