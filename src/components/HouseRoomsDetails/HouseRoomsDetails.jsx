import { Row, Col, Form, Button, Accordion } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import roomServices from '../../services/room.services'
import bookingServices from '../../services/booking.services'
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
import './HouseRoomsDetails.css'

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

    const houseHandleFormSubmit = (house_id) => e => {

        e.preventDefault()

        houseServices
            .deleteHouse(house_id, { house_id })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const roomHandleFormSubmit = (room_id) => e => {

        e.preventDefault()

        roomServices
            .deleteRoom(room_id, { house_id: rooms_house_id })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    let shouldRenderContent
    if (houseData.rating) {
        shouldRenderContent = !houseData.rating.some((ratedBy) => ratedBy.userId._id === loggedUser._id);
    }

    return (
        <div className='HouseRoomsDetails'>
            <Row>
                <Col>

                    {houseData.title ?
                        <>
                            <Row className="house-header justify-content-between">
                                <Col>
                                    <h1>{houseData.title}</h1>
                                    <h2>{houseData.address.city}, {houseData.address.country}</h2>
                                    {
                                        houseData.totalScore &&
                                        <p>★ {houseData.totalScore}</p>
                                    }
                                </Col>
                                <Col className="text-end pt-3">
                                    <h4>Hosted by <Link to={`/user/${houseData.owner._id}`}>{houseData.owner.firstName} {houseData.owner.lastName}</Link></h4>
                                    <div className="house-price-container">
                                        <h3><strong>From</strong> € {houseData.price.housePrice}<strong> night</strong></h3>
                                    </div>
                                </Col>
                            </Row>

                            <GalleryCarousel gallery={houseData.gallery} size={'70vh'} />

                            <br />
                            <div className="description">
                                <h2>Something about the house...</h2>
                                <p>{houseData.description}</p>
                            </div>

                            <Row className='justify-content-between'>
                                <Col>
                                    <div className="house-info">
                                        <h4>House info: </h4>
                                        <ul>
                                            <li>{houseData.info.maxGuests} Guests</li>
                                            <li>{houseData.info.rooms} Rooms</li>
                                            {
                                                houseData.info.beds === 1 ?
                                                    <li>{houseData.info.beds} Bed</li>
                                                    :
                                                    <li>{houseData.info.beds} Beds</li>
                                            }
                                            {
                                                houseData.info.bathrooms === 1 ?
                                                    <li>{houseData.info.bathrooms} Bathroom</li>
                                                    :
                                                    <li>{houseData.info.bathrooms} Bathrooms</li>
                                            }
                                        </ul>
                                    </div>
                                </Col>
                                <Col className="text-end d-flex flex-column">
                                    <p className='cleaning-price'>House Cleaning price <strong>€ {houseData.price.cleaningPrice}</strong></p>
                                    <div className="mt-auto">
                                        <Link className='btn btn-warning mb-1' to={`/house-edit/${houseData._id}`}>Edit</Link>
                                        <Form onSubmit={houseHandleFormSubmit(houseData._id)}>
                                            <Button variant="danger" type="submit">Delete</Button>
                                        </Form>
                                    </div>
                                </Col>

                            </Row>

                            {
                                houseData.amenities.length > 0 &&
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>What this place offers</Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                houseData.amenities.map((eachAmenity, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <p>{eachAmenity.amenity.name}</p>
                                                            <img style={{ height: '20px' }} src={eachAmenity.amenity.icon} alt="icon" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            }

                            <hr />

                            {
                                houseData.rooms &&
                                <h2 className='rooms-title mt-5'>{houseData.title}'s rooms</h2>
                            }
                        </>
                        :
                        'Loading...'}
                    {
                        houseData.rooms &&
                        houseData.rooms.map(eachRoom => {
                            return (
                                <div key={eachRoom.title} className='Room'>
                                    <Row className="room-header justify-content-between mb-3">
                                        <Col>
                                            <h2>{eachRoom.title}</h2>
                                        </Col>
                                        <Col className="text-end pt-3 room-price-container">
                                            <h3>€ {eachRoom.price.roomPrice}<strong> night</strong></h3>
                                        </Col>
                                    </Row>

                                    <GalleryCarousel gallery={eachRoom.gallery} size={'60vh'} />
                                    <br />

                                    <div className="description">
                                        <h2>Something about the room...</h2>
                                        <p>{eachRoom.description}</p>
                                    </div>
                                    <hr />

                                    <div className="house-info">
                                        <h4>Room info: </h4>
                                        <ul>
                                            <li>{eachRoom.info.maxGuests} guest</li>
                                            {
                                                eachRoom.info.beds === 1 ?
                                                    <li>{eachRoom.info.beds} bed</li>
                                                    :
                                                    <li>{eachRoom.info.beds} beds</li>
                                            }
                                            <li>Bathroom type: {eachRoom.info.bathroom}</li>
                                        </ul>
                                    </div>

                                    <p>€ {eachRoom.price.cleaningPrice} cleaning price</p>

                                    {

                                        eachRoom.bookings.map(eachBooking => {
                                            const entryDateStr = eachBooking.bookingDates.entry
                                            const exitDateStr = eachBooking.bookingDates.exit

                                            const entryDate = new Date(entryDateStr);
                                            const exitDate = new Date(exitDateStr);

                                            const actualDate = new Date();

                                            return (
                                                (actualDate >= entryDate && actualDate <= exitDate) &&
                                                <p>
                                                    Rented by <Link
                                                        to={`/user/${eachBooking.user._id}`}>
                                                        {eachBooking.user.firstName} {eachBooking.user.lastName}
                                                    </Link> until {eachBooking.bookingDates.exit.split('T')[0]}
                                                </p>
                                            )

                                        })
                                    }
                                    <hr />

                                    <Link className='btn btn-dark' disabled={true} to={`/booking/${eachRoom._id}`}>Booking</Link>
                                    <br />
                                    <hr />

                                    <div className="room-action-buttons">
                                        <Form onSubmit={roomHandleFormSubmit(eachRoom._id)} >
                                            <Button variant="danger" type="submit" >Delete</Button>
                                        </Form>
                                        <Link className='btn btn-warning' to={`/rooms-edit/${eachRoom._id}`}>Edit</Link>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                    }
                    {
                        shouldRenderContent ?
                            <RateHouse getHouseRoomForm={getHouseRoomForm} toWhereRates={'House'} />
                            :
                            <p>You've already rated this house</p>
                    }
                    {
                        houseData.rating &&
                        houseData.rating.map(eachRating => {
                            return (
                                <Rating rating={eachRating} />
                            )
                        })
                    }
                    <br />
                    <MapDetails houseData={[houseData]} zoom={15} />
                </Col>
            </Row >
        </div >
    )
}

export default HouseRoomsDetails