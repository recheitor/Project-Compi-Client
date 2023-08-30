import { useState, useContext, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import roomServices from '../../services/room.services'
import houseServices from '../../services/house.services'

import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from '../../services/upload.services'
import { AuthContext } from "../../contexts/auth.context"


const EditRoomForm = () => {



    const { loggedUser } = useContext(AuthContext)

    const { id } = useParams()

    const getHousesForm = () => {

        Promise.all([houseServices.getHousesbyOwnerId(loggedUser._id), roomServices.getOneRoom(id)])
            .then(result => {
                const ownerHouses = result[0].data
                const roomDetails = result[1].data
                setRoomData({ ...roomData, house: ownerHouses, ...roomDetails })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getHousesForm()
    }, [])

    const [roomData, setRoomData] = useState({
        house: [],
        title: '',
        gallery: [],
        description: '',
        info: {
            maxGuests: '',
            beds: '',
            bathroom: ''
        },
        price: {
            roomPrice: '',
            cleaningPrice: '',
        },
        house_id: ''
    })

    const [loadingGallery, setLoadingGallery] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setRoomData({ ...roomData, [name]: value })
    }


    const handleFormSubmit = e => {

        e.preventDefault()

        roomServices
            .createRoom(roomData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingGallery(true)

        const formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imagesData', e.target.files[i])
        }
        console.log(formData)
        uploadServices
            .uploadimages(formData)
            .then(({ data }) => {
                const newGalleryUrls = [...roomData.gallery, data.cloudinary_urls]

                setRoomData({ ...roomData, gallery: newGalleryUrls })
                setLoadingGallery(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingGallery(true)
            })
    }

    return (
        <div className="EditHomeForm">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="room">
                    <Form.Select size="sm" value={roomData.house_id} name='house_id' onChange={handleInputChange}>
                        <option key='Selectt' >Select a house</option>
                        {
                            roomData.house.map(eachHouse =>
                                <option key={eachHouse._id + 'room'} value={eachHouse._id}>
                                    {eachHouse.title}
                                </option>)
                        }
                    </Form.Select>
                </Form.Group>

                <p>Image Gallery</p>
                {
                    roomData.gallery.map(eachPhoto => {
                        return (
                            <img style={{ height: '100px' }} src={eachPhoto} alt="" />
                        )
                    })
                }



                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={roomData.title} name="title" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="gallery">
                    <Form.Label>Add images</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileUpload} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={roomData.description} name="description" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="maxGuests">
                    <Form.Label>Max Guests</Form.Label>
                    <Form.Control type="number" value={roomData.info.maxGuests} name="maxGuests" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="beds">
                    <Form.Label>Beds</Form.Label>
                    <Form.Control type="number" value={roomData.info.beds} name="beds" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bathroom">
                    <Form.Label>Bathroom Type</Form.Label>
                    <Form.Control type="text" value={roomData.info.bathroom} name="bathroom" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="roomPrice">
                    <Form.Label>Room Price</Form.Label>
                    <Form.Control type="number" value={roomData.price.roomPrice} name="roomPrice" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cleaningPrice">
                    <Form.Label>Cleaning Price</Form.Label>
                    <Form.Control type="number" value={roomData.price.cleaningPrice} name="cleaningPrice" onChange={handleInputChange} />
                </Form.Group>



                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingGallery}>
                        {loadingGallery ? 'Uploading gallery...' : 'Edit Room'}</Button>
                </div>
            </Form>
        </div >
    )
}

export default EditRoomForm
