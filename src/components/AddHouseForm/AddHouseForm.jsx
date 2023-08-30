import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import houseServices from '../../services/house.services'
import { useNavigate } from 'react-router-dom'
import uploadServices from '../../services/upload.services'

const AddHouseForm = () => {

    const [houseData, setHouseData] = useState({
        title: '',
        gallery: '',
        description: '',
        maxGuests: '',
        rooms: '',
        beds: '',
        bathrooms: '',
        housePrice: '',
        cleaningPrice: '',
        street: '',
        number: '',
        zipcode: '',
        city: '',
        country: '',
        // amenity: '',
        // included: '',
        // owner: ''
    })

    const [loadingGallery, setLoadingGallery] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setHouseData({ ...houseData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        houseServices
            .createHouse(houseData)
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
                setHouseData({ ...houseData, gallery: data.cloudinary_urls })
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
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={houseData.title} name="title" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="gallery">
                    <Form.Label>Gallery (URL)</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileUpload} />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="gallery">
                    <Form.Label>Gallery</Form.Label>
                    <Form.Control type="text" value={houseData.gallery} name="gallery" onChange={handleInputChange} />
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={houseData.description} name="description" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="maxGuests">
                    <Form.Label>Max Guests</Form.Label>
                    <Form.Control type="number" value={houseData.maxGuests} name="maxGuests" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rooms">
                    <Form.Label>Rooms</Form.Label>
                    <Form.Control type="number" value={houseData.rooms} name="rooms" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="beds">
                    <Form.Label>Beds</Form.Label>
                    <Form.Control type="number" value={houseData.beds} name="beds" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bathrooms">
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control type="number" value={houseData.bathrooms} name="bathrooms" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="housePrice">
                    <Form.Label>House Price</Form.Label>
                    <Form.Control type="number" value={houseData.housePrice} name="housePrice" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cleaningPrice">
                    <Form.Label>Cleaning Price</Form.Label>
                    <Form.Control type="number" value={houseData.cleaningPrice} name="cleaningPrice" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" value={houseData.street} name="street" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="number">
                    <Form.Label>Number</Form.Label>
                    <Form.Control type="number" value={houseData.number} name="number" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="number" value={houseData.zipcode} name="zipcode" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={houseData.city} name="city" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" value={houseData.country} name="country" onChange={handleInputChange} />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="amenity">
                    <Form.Label>Amenity</Form.Label>
                    <Form.Control type="text" value={houseData.amenity} name="amenity" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="included">
                    <Form.Label>Included</Form.Label>
                    <Form.Control type="text" value={houseData.included} name="included" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="owner">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" value={houseData.owner} name="owner" onChange={handleInputChange} />
                </Form.Group> */}

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingGallery}>
                        {loadingGallery ? 'Uploading gallery...' : 'Add House'}</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddHouseForm
