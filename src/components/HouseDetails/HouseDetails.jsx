import { Row, Col, Form, Button } from 'react-bootstrap'
import houseService from '../../services/house.services'
import { Link, useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


const HouseDetails = () => {
    const { house_id } = useParams()

    const getHouseForm = () => {

        houseService
            .getOneHouse(house_id)
            .then(({ data: houseDetails }) => {
                let totalScore = 0
                houseDetails.rating.forEach(({ score }) => totalScore += score)
                totalScore = totalScore / houseDetails.rating.length
                houseDetails.totalScore = totalScore
                setHouseData(houseDetails)
            }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getHouseForm()
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


    const handleFormSubmit = e => {

        e.preventDefault()

        houseService
            .deleteHouse(house_id)
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
                    <Form onSubmit={handleFormSubmit} >
                        <Button variant="dark" type="submit" >Delete</Button>
                    </Form>
                    <Link className='btn btn-dark' to={`/house-edit/${houseData._id}`}>Edit</Link>




                </Col>

            </Row >
        </>
    )
}

export default HouseDetails