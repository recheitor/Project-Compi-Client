import { Container, Row, Form, Button, Modal, Col } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState, useContext } from 'react'
import HouseCard from '../HouseCard/HouseCard';
import Map from '../../components/Map/Map'
import updateHouseRooms from '../../utils/updateHouseDetails';
import './HouseRooms.css'
import { AUTONOMIC_COMUNITIES_FILTER_NAME, AUTONOMIC_COMUNITIES_FILTER_VALUE } from '../../consts/house.consts';
import { AuthContext } from '../../contexts/auth.context'

let filterBy = {}
let filterQuery = ''

const HouseRooms = () => {

    const [show, setShow] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const { loggedUser } = useContext(AuthContext)

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
        if (!loggedUser) {
            getHouseRoomForm()
        } else {
            getHouseRoomFormQuery()
        }
    }, [])

    const getHouseRoomForm = () => {

        houseServices
            .getAllHouses()
            .then(({ data: RoomDetails }) => {
                if (RoomDetails.length >= 1) {
                    setHouseData(updateHouseRooms(RoomDetails))
                } else {
                    setHouseData(false)
                }
            }
            )
            .catch(err => console.log(err))
    }

    const getHouseRoomFormQuery = (filterBy) => {
        filterBy = filterBy ? filterBy : []
        houseServices

            .getHousesbyType('shared', filterBy)
            .then(({ data: RoomDetails }) => {
                if (RoomDetails.length >= 1) {
                    setHouseData(updateHouseRooms(RoomDetails))
                } else {
                    setHouseData(false)
                }
            }
            )
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        filterBy = { ...filterBy, [name]: value }

        filterQuery = ''
        for (const property in filterBy) {
            filterQuery += `&${property}=${filterBy[property]}`
        }
        filterQuery = filterQuery.slice(1)

        setFilterData({ ...filterData, ...filterBy })
    }

    const handleClose = () => {
        getHouseRoomFormQuery(filterQuery)
        setShow(false)
    }

    const handleCityFilter = e => {
        handleInputChange(e)
        getHouseRoomFormQuery(filterQuery)

    }

    const handleFavorite = () => {

        filterBy.userFavorites = filterBy.userFavorites ? false : true

        filterBy = { ...filterBy, userFavorites: filterBy.userFavorites }
        filterQuery = ''
        for (const property in filterBy) {
            filterQuery += `&${property}=${filterBy[property]}`
        }
        filterQuery = filterQuery.slice(1)

        getHouseRoomFormQuery(filterQuery)

    }

    const handleReset = () => {

        filterQuery = null
        filterBy = []

        setFilterData({
            beds: '',
            bathrooms: '',
            maxGuests: '',
            rooms: '',
            price: '',
            province: ''

        })

    }

    const handleShow = () => setShow(true)

    const handleShowMap = () => {
        showMap ?
            setShowMap(false)
            :
            setShowMap(true)
    }

    return (
        <div className='HouseRooms'>
            <Container className='options'>
                <Row className='justify-content-between'>
                    <Col lg={{ span: 3 }} md={{ span: 6 }}>
                        <Row>
                            {
                                loggedUser ?
                                    <>
                                        <Col lg={{ span: 3 }} md={{ span: 6 }}>
                                            <Button variant="dark" onClick={handleShow}>
                                                Filter
                                            </Button>
                                        </Col>
                                        <Col lg={{ span: 9 }} md={{ span: 6 }} >
                                            <Form.Group className="mb-3" controlId="province">
                                                <Form.Select size="sm" value={filterData.province} name='province' onChange={handleCityFilter}>
                                                    <option key='Select' value={''}>Todas las provincias</option>
                                                    {
                                                        AUTONOMIC_COMUNITIES_FILTER_NAME.map((eachComunity, idx) => {
                                                            return (
                                                                <option
                                                                    key={eachComunity}
                                                                    value={AUTONOMIC_COMUNITIES_FILTER_VALUE[idx]}
                                                                >
                                                                    {eachComunity}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </>

                                    :
                                    ''
                            }

                        </Row>


                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 6 }} className='text-center'>
                        <Button variant="dark" className='ShowMap' onClick={handleShowMap}>
                            {showMap ? 'Show List' : 'Show Map'}
                        </Button>
                    </Col>
                    <Col lg={{ span: 3 }} md={{ span: 6 }} className='text-end'>
                        {
                            loggedUser ?
                                <Button variant="dark" onClick={handleFavorite}>
                                    {filterBy.userFavorites ? 'Hide Favorites' : 'Show Favorites'}
                                </Button>
                                :
                                ''
                        }

                    </Col>

                    <Col lg={{ span: 3 }} md={{ span: 6 }}>

                    </Col>
                </Row>



            </Container >

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
                    <Button variant="secondary" className='ModalFilterButton' onClick={handleReset}>
                        Reset Filter
                    </Button>
                    <Button variant="dark" className='ModalFilterButton apply-filter' onClick={handleClose}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                houseData ?
                    showMap &&
                    < Map houseData={houseData} zoom={5} />
                    :
                    showMap &&
                    'NO HAY MAPAS'
            }
            {
                houseData ?
                    !showMap &&
                    <Container fluid style={{ maxWidth: '1200px' }}>
                        <Row>
                            {
                                houseData[0].price.housePrice &&
                                houseData.map((eachHouseData, idx) => {
                                    return (
                                        <Col key={idx} lg={{ span: 4 }} md={{ span: 6 }}>
                                            <HouseCard data={eachHouseData} />
                                        </Col>


                                    )
                                })
                            }
                        </Row >
                    </Container>
                    :
                    !showMap &&
                    ' NO HAY CASAS'
            }
        </div >
    )
}

export default HouseRooms