import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import amenityServices from '../../services/amenity.services'
import { useNavigate } from 'react-router-dom'


const AddAmenityForm = () => {

    const [amenityData, setAmenityData] = useState({
        name: '',
        icon: ''
    })

    const navigate = useNavigate()

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

    return (
        <div className="AddAmenityForm">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={amenityData.name} name="name" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="icon">
                    <Form.Label>Icon</Form.Label>
                    <Form.Control type="text" value={amenityData.icon} name="icon" onChange={handleInputChange} />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Add Amenity</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddAmenityForm
