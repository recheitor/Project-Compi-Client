import { Row, Col } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const Houses = () => {

    const getHouseRoomForm = () => {

        houseServices
            .getHousesbyType('entire')
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
        getHouseRoomForm()
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
                <Col>{
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
                                    <p>House rating: {eachHouseData.totalScore}</p>
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