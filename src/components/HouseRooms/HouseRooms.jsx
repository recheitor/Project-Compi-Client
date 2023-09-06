import { Row, Form, Button, Modal } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState } from 'react'
import HouseCard from '../HouseCard/HouseCard';
import Map from '../../components/Map/Map'
import updateHouseRooms from '../../utils/updateHouseDetails';


let filterBy = {}

const HouseRooms = () => {

    const [show, setShow] = useState(false)
    const [showMap, setShowMap] = useState(false)

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
            .then(({ data: RoomDetails }) => setHouseData(updateHouseRooms(RoomDetails)))
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

    const handleShowMap = () => {
        showMap ?
            setShowMap(false)
            :
            setShowMap(true)
    }

    return (
        <>
            <Container>
                <Button variant="dark" onClick={handleShow}>
                    Filter
                </Button>

                <Button variant="dark" onClick={handleShowMap}>
                    {showMap ? 'Show List' : 'Show Map'}
                </Button>
            </Container>

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
                showMap && houseData[0].location ?
                    < Map houseData={houseData} zoom={5} />
                    :
                    ''
            }
            {
                !showMap ?
                    <Container className='mt-3'>
                        <Row>
                            {
                                houseData[0].price.housePrice ?
                                    houseData.map(eachHouseData => {
                                        return (
                                            < >
                                                <HouseCard key={eachHouseData.title} data={eachHouseData} />
                                            </>
                                        )
                                    })
                                    :
                                    ''
                            }
                        </Row >
                    </Container>
                    :
                    ''
            }
        </>
    )
}

export default HouseRooms