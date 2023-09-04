import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import userServices from '../../services/user.services'

import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from '../../services/upload.services'


const EditProfileForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [loadingAvatar, setLoadingAvatar] = useState(false)

    const [userData, setUserData] = useState({
        avatar: '',
        firstName: '',
        lastName: '',
        bio: ''
    })

    useEffect(() => {
        getProfileForm()
    }, [])

    const getProfileForm = () => {

        userServices
            .user(id)
            .then(({ data: userDetails }) => {
                setUserData({ ...userDetails })
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setUserData({ ...userData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        userServices
            .editUser(userData._id, userData)
            .then(() => navigate('/account'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingAvatar(true)

        const formData = new FormData()

        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setUserData({ ...userData, avatar: data.cloudinary_url })
                setLoadingAvatar(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingAvatar(true)
            })
    }

    return (
        <div className="EditProfileForm">
            <Form onSubmit={handleFormSubmit}>
                <p>Avatar</p>
                <img style={{ height: '100px' }} src={userData.avatar} alt="" />

                <Form.Group className="mb-3" controlId="gallery">
                    <Form.Label>Edit avatar</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileUpload} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={userData.firstName} name="firstName" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={userData.lastName} name="lastName" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="text" value={userData.bio} name="bio" onChange={handleInputChange} />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingAvatar}>
                        {loadingAvatar ? 'Uploading avatar...' : 'Edit Profile'}</Button>
                </div>
            </Form>
        </div >
    )
}

export default EditProfileForm
