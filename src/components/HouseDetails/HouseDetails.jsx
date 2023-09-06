import { Row, Col, Form, Button } from 'react-bootstrap'
import houseService from '../../services/house.services'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { HOUSE_INITIAL_COORDS } from '../../consts/house.consts'
import Map from '../../components/Map/Map'




const HouseDetails = () => {

    const navigate = useNavigate()
    const { house_id } = useParams()

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
        getHouseForm()
    }, [])

    const getHouseForm = () => {

        houseService
            .getOneHouse(house_id)
            .then(({ data: houseDetails }) => {
                let totalScore = 0
                houseDetails.rating.forEach(({ score }) => totalScore += score)
                totalScore = totalScore / houseDetails.rating.length
                houseDetails.totalScore = totalScore
                const updateLocation = { lat: houseDetails.location.coordinates[1], lng: houseDetails.location.coordinates[0] }
                houseDetails.location.coordinates = updateLocation
                setHouseData(houseDetails)
            }
            )
            .catch(err => console.log(err))
    }



    const handleDeleteFormSubmit = e => {

        e.preventDefault()

        houseService
            .deleteHouse(house_id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const handleAddFavoriteSubmit = e => {

        e.preventDefault()

        houseService
            .addFavoriteHouse(house_id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const handleDeleteFavoriteSubmit = e => {

        e.preventDefault()

        houseService
            .deleteFavoriteHouse(house_id)
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
                            <Map houseData={[houseData]} />
                    }


                    <Form onSubmit={handleDeleteFormSubmit} >
                        <Button variant="dark" type="submit" >Delete</Button>
                    </Form>

                    <Form onSubmit={handleAddFavoriteSubmit} >
                        <Button variant="dark" type="submit" >Add favorite</Button>
                    </Form>
                    <Form onSubmit={handleDeleteFavoriteSubmit} >
                        <Button variant="dark" type="submit" >Remove favorite</Button>
                    </Form>

                    <Link className='btn btn-dark' to={`/house-edit/${houseData._id}`}>Edit</Link>


                </Col>
            </Row >
        </>
    )
}

export default HouseDetails