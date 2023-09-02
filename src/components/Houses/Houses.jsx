import { Row, Col, Button, Form } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


let filterBy = {}

const Houses = () => {



    // const filterButton = e => {
    //     const { name, value } = e.target
    //     const filterBy = `${name}=${value}`
    //     getHouseRoomFormQuery(filterBy)
    // }



    const [filterData, setFilterData] = useState({
        beds: '',
        bathrooms: ''

    })



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



    const getHouseRoomFormQuery = (filterBy) => {
        filterBy = filterBy ? filterBy : []
        houseServices

            .getHousesbyType('entire', filterBy)
            .then(({ data: RoomDetails }) => {

                RoomDetails.forEach(eachHouse => {
                    let totalScore = 0
                    eachHouse.rating.forEach(({ score }) => totalScore += score)
                    totalScore = totalScore / eachHouse.rating.length
                    eachHouse.totalScore = totalScore
                })
                setHouseData(RoomDetails)
            }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {

        getHouseRoomFormQuery()
    }, [])


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

    return (
        <>
            <Row>
                <Col>


                    {/* <Form.Group className="mb-3" controlId="house">
                        <Form.Select size="sm" name='sort' onChange={handleInputChange}>
                            <option key='Select' >Renting type</option>
                            <option key='entire' value='entire' >Entire houses</option>
                            <option key='rooms' value='rooms' >Private Rooms</option>
                        </Form.Select>
                    </Form.Group> */}


                    {/* <Button key='price' variant="dark" value='1000' name='price' onClick={filterButton} >Filter price</Button> */}
                    {/* <Button key='beds' variant="dark" value='1' name='beds' onClick={filterButton} >Filter beds</Button> */}
                    {/* <Button key='sortBeds' variant="dark" value='beds' name='sort' onClick={filterButton} >sort beds</Button> */}

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Min Beds</Form.Label>
                        <Form.Control type="number" value={filterData.beds} onChange={handleInputChange} name="beds" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Min Bathrooms</Form.Label>
                        <Form.Control type="number" value={filterData.bathrooms} onChange={handleInputChange} name="bathrooms" />
                    </Form.Group>

                    {
                        houseData ?

                            houseData.map(eachHouseData => {
                                return (

                                    <div key={eachHouseData.title}>
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

            </Row>
        </>
    )
}

export default Houses