import { Row, Col } from 'react-bootstrap'
import houseServices from '../../services/house.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const HouseRoomsDetails = () => {

    const getHouseRoomForm = () => {

        houseServices
            .getHousesbyType('shared')
            .then(({ data: houseRoomDetails }) => {


                houseRoomDetails.forEach(eachHouseRoom => {
                    let totalScore = 0
                    eachHouseRoom.rating.forEach(({ score }) => totalScore += score)
                    totalScore = totalScore / eachHouseRoom.rating.length
                    eachHouseRoom.totalScore = totalScore
                })
                setHouseData(houseRoomDetails)
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

export default HouseRoomsDetails