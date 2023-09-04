import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import roomServices from '../../services/room.services'

import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from '../../services/upload.services'


const EditRoomForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [loadingGallery, setLoadingGallery] = useState(false)

    const [roomData, setRoomData] = useState({
        title: '',
        gallery: [],
        description: '',
        maxGuests: '',
        beds: '',
        bathroom: '',
        roomPrice: '',
        cleaningPrice: '',
    })

    useEffect(() => {
        getHousesForm()
    }, [])

    const getHousesForm = () => {

        roomServices
            .getOneRoom(id)
            .then(({ data: roomDetails }) => {

                const { maxGuests, beds, bathroom } = roomDetails.info
                delete roomDetails.info
                const { roomPrice, cleaningPrice } = roomDetails.price
                delete roomDetails.price
                setRoomData({ ...roomData, ...roomDetails, maxGuests, beds, bathroom, roomPrice, cleaningPrice })
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setRoomData({ ...roomData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        roomServices
            .editRoom(roomData._id, roomData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingGallery(true)

        const formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imagesData', e.target.files[i])
        }

        uploadServices
            .uploadimages(formData)
            .then(({ data }) => {
                const newGalleryUrls = [...roomData.gallery, ...data.cloudinary_urls]
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
                <p>Image Gallery</p>
                {
                    roomData.gallery.map(eachPhoto => {
                        return (
                            <img key={eachPhoto} style={{ height: '100px' }} src={eachPhoto} alt="" />
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
                    <Form.Control type="number" value={roomData.maxGuests} name="maxGuests" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="beds">
                    <Form.Label>Beds</Form.Label>
                    <Form.Control type="number" value={roomData.beds} name='beds' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bathroom">
                    <Form.Label>Bathroom Type</Form.Label>
                    <Form.Control type="text" value={roomData.bathroom} name="bathroom" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="roomPrice">
                    <Form.Label>Room Price</Form.Label>
                    <Form.Control type="number" value={roomData.roomPrice} name="roomPrice" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cleaningPrice">
                    <Form.Label>Cleaning Price</Form.Label>
                    <Form.Control type="number" value={roomData.cleaningPrice} name="cleaningPrice" onChange={handleInputChange} />
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
