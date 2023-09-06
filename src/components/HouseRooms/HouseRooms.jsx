import { Row, Form, Button, Modal } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState } from 'react'
import HouseCard from '../HouseCard/HouseCard';
import Map from '../../components/Map/Map'


let filterBy = {}

const HouseRooms = () => {

    const [show, setShow] = useState(false)

    const [houseData, setHouseData] = useState([{
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
    }])

    const [filterData, setFilterData] = useState({
        beds: '',
        bathrooms: '',
        maxGuests: '',
        rooms: '',
        price: '',
    })

    useEffect(() => {
        getHouseRoomFormQuery()
    }, [])

    const getHouseRoomFormQuery = (filterBy) => {
        filterBy = filterBy ? filterBy : []
        houseServices

            .getHousesbyType('shared', filterBy)
            .then(({ data: RoomDetails }) => {

                RoomDetails.forEach(eachHouse => {
                    let totalScore = 0
                    eachHouse.rating.forEach(({ score }) => totalScore += score)
                    totalScore = totalScore / eachHouse.rating.length
                    eachHouse.totalScore = totalScore
                    let updateLocation = { lat: eachHouse.location.coordinates[1], lng: eachHouse.location.coordinates[0] }
                    eachHouse.location.coordinates = updateLocation
                })
                setHouseData(RoomDetails)
            }
            )
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        filterBy = { ...filterBy, [name]: value }

        let filterQuery = ''
        for (const property in filterBy) {
            filterQuery += `&${property}=${filterBy[property]}`


        }
        filterQuery = filterQuery.slice(1)

        getHouseRoomFormQuery(filterQuery)
        setFilterData({ ...filterData, ...filterBy })
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            {/* <Form.Group className="mb-3" controlId="beds">
                        <Form.Label>Min Beds</Form.Label>
                        <Form.Control type="number" value={filterData.beds} onChange={handleInputChange} name="beds" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bathrooms">
                        <Form.Label>Min Bathrooms</Form.Label>
                        <Form.Control type="number" value={filterData.bathrooms} onChange={handleInputChange} name="bathrooms" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="maxGuests">
                        <Form.Label>Max Guests</Form.Label>
                        <Form.Control type="number" value={filterData.maxGuests} onChange={handleInputChange} name="maxGuests" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rooms">
                        <Form.Label>Min Rooms</Form.Label>
                        <Form.Control type="number" value={filterData.rooms} onChange={handleInputChange} name="rooms" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Max Price</Form.Label>
                        <Form.Control type="number" value={filterData.price} onChange={handleInputChange} name="price" />
                    </Form.Group> */}

            <Button variant="dark" onClick={handleShow}>
                Filter
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter rooms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="beds">
                        <Form.Label>Min Beds</Form.Label>
                        <Form.Control type="number" value={filterData.beds} onChange={handleInputChange} name="beds" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bathrooms">
                        <Form.Label>Min Bathrooms</Form.Label>
                        <Form.Control type="number" value={filterData.bathrooms} onChange={handleInputChange} name="bathrooms" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="maxGuests">
                        <Form.Label>Max Guests</Form.Label>
                        <Form.Control type="number" value={filterData.maxGuests} onChange={handleInputChange} name="maxGuests" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rooms">
                        <Form.Label>Min Rooms</Form.Label>
                        <Form.Control type="number" value={filterData.rooms} onChange={handleInputChange} name="rooms" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Max Price</Form.Label>
                        <Form.Control type="number" value={filterData.price} onChange={handleInputChange} name="price" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                houseData[0].location ?
                    < Map houseData={houseData} />
                    :
                    ''
            }
            <Row>
                {
                    houseData[0].price.housePrice ?

                        houseData.map(eachHouseData => {
                            return (
                                < >
                                    <HouseCard key={eachHouseData.title} data={eachHouseData} />
                                    {/* <h2>House Title:{eachHouseData.title}</h2>
                                        <p>House Description:{eachHouseData.description}</p>
                                        <p>House Max guests: {eachHouseData.info.maxGuests}</p>
                                        <p>House rooms: {eachHouseData.info.rooms}</p>
                                        <p>House beds: {eachHouseData.info.beds}</p>
                                        <p>House bathrooms: {eachHouseData.info.bathrooms}</p>
                                        <p>House price: {eachHouseData.price.housePrice}€ </p>
                                        <p>House Cleaning price: {eachHouseData.price.cleaningPrice}€ </p>
                                        <p>House Owner: {eachHouseData.owner.firstName} {eachHouseData.owner.lastName} </p>
                                        <p>House rating:
                                            {
                                                !eachHouseData.totalScore ? ' Not rated' : eachHouseData.totalScore
                                            }
                                        </p>
                                        <Link to={`/rooms/${eachHouseData._id}`} className='btn btn-dark'>Details</Link>

                                        {
                                            eachHouseData.gallery.map(eachPhoto => {
                                                return (
                                                    <img key={eachPhoto} style={{ height: '100px' }} src={eachPhoto} alt="" />
                                                )
                                            })
                                        }
                                        {
                                            eachHouseData.rooms ?
                                                eachHouseData.rooms.map(eachRoom => {
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
                                                        </div>
                                                    )
                                                })
                                                :
                                                ''
                                        }
                                        <hr /> */}
                                </>
                            )
                        })
                        :
                        ''
                }
            </Row >
        </>
    )
}

export default HouseRooms