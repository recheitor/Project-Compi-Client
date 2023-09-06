import { Row, Col, Form } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Map from '../../components/Map/Map'


// TODO: MEJORAR LA CREACIÓN DE URL -> https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set

let filterBy = {}

const Houses = () => {

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
        price: ''
    })

    useEffect(() => {
        getHouseRoomFormQuery()
    }, [])

    const getHouseRoomFormQuery = (filterBy) => {
        filterBy = filterBy ? filterBy : []
        houseServices
            .getHousesbyType('entire', filterBy)
            .then(({ data: houseDetails }) => {

                houseDetails.forEach(eachHouse => {
                    let totalScore = 0
                    eachHouse.rating.forEach(({ score }) => totalScore += score)
                    totalScore = totalScore / eachHouse.rating.length
                    eachHouse.totalScore = totalScore
                    let updateLocation = { lat: eachHouse.location.coordinates[1], lng: eachHouse.location.coordinates[0] }
                    eachHouse.location.coordinates = updateLocation
                })
                setHouseData(houseDetails)
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



    return (
        <>
            <Row>
                <Col>
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


                    {
                        houseData[0].location ?

                            < Map houseData={houseData} />

                            :
                            ''
                    }

                    {
                        houseData ?

                            houseData.map((eachHouseData, idx) => {
                                return (

                                    <div key={idx}>
                                        <h2>House Title:{eachHouseData.title}</h2>
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
                                        <Link to={`/houses/${eachHouseData._id}`} className='btn btn-dark'>Details</Link>

                                        {
                                            eachHouseData.gallery.map(eachPhoto => {
                                                return (
                                                    <img key={eachPhoto} style={{ height: '100px' }} src={eachPhoto} alt="" />
                                                )
                                            })
                                        }
                                        <hr />
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

export default Houses