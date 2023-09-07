import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import amenityServices from '../../services/amenity.services'
import { useNavigate } from 'react-router-dom'
import uploadServices from '../../services/upload.services'

const AddAmenityForm = () => {

    const navigate = useNavigate()
    const [loadingIcon, setLoadingIcon] = useState(false)

    const [amenityData, setAmenityData] = useState({
        name: '',
        icon: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setAmenityData({ ...amenityData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        amenityServices
            .createAmenity(amenityData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingIcon(true)

        const formData = new FormData()

        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setAmenityData({ ...amenityData, icon: data.cloudinary_url })
                setLoadingIcon(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingIcon(true)
            })
    }

    return (
        <div className="AddAmenityForm">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={amenityData.name} name="name" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="icon">
                    <Form.Label>Icon</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>


                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingIcon}>
                        {loadingIcon ? 'Uploading icon...' : 'Add Amenity'}</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddAmenityForm
