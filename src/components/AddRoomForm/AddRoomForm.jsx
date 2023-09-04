import { useState, useContext, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import roomServices from '../../services/room.services'
import houseServices from '../../services/house.services'

import { useNavigate } from 'react-router-dom'
import uploadServices from '../../services/upload.services'
import { AuthContext } from "../../contexts/auth.context"

const AddRoomForm = () => {

    const navigate = useNavigate()
    const { loggedUser } = useContext(AuthContext)
    const [loadingGallery, setLoadingGallery] = useState(false)

    const [roomData, setRoomData] = useState({
        house: [],
        title: '',
        gallery: '',
        description: '',
        maxGuests: '',
        beds: '',
        bathroom: 'Private',
        roomPrice: '',
        cleaningPrice: '',
        house_id: ''
    })

    useEffect(() => {
        getHousesForm()
    }, [])

    const getHousesForm = () => {
        houseServices
            .getHousesbyOwnerId(loggedUser._id)
            .then(({ data }) => setRoomData({ ...roomData, house: data }))
            .catch(err => console.log(err))
    }

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

        uploadServices
            .uploadimages(formData)
            .then(({ data }) => {
                setRoomData({ ...roomData, gallery: data.cloudinary_urls })
                setLoadingGallery(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingGallery(true)
            })
    }

    return (
        <div className="AddHomeForm">
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="house">
                    <Form.Select size="sm" value={roomData.house_id} name='house_id' onChange={handleInputChange}>
                        <option key='Select' >Select a house</option>
                        {
                            roomData.house.map(eachHouse =>
                                <option
                                    key={eachHouse._id}
                                    value={eachHouse._id}

                                >
                                    {eachHouse.title}
                                </option>)
                        }

                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={roomData.title} name="title" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="gallery">
                    <Form.Label>Gallery (URL)</Form.Label>
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
                    <Form.Control type="number" value={roomData.beds} name="beds" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bathroom">
                    <Form.Label>Bathroom Type</Form.Label>
                    <Form.Select size="sm" value={roomData.bathroom} name='bathroom' onChange={handleInputChange}>
                        <option key='Private' value='Private'>Private</option>
                        <option key='Shared' value='Shared'>Shared</option>
                    </Form.Select>
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
                    <Button variant="dark" type="submit" disabled={loadingGallery} >
                        {loadingGallery ? 'Uploading gallery...' : 'Add Room'}</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddRoomForm
