import { Container, Row, Col } from 'react-bootstrap'
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm'

const EditProfilePage = () => {

    return (
        <Container className="EditProfilePage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>Edit profile</h1>
                    <hr />
                    <EditProfileForm />
                </Col>
            </Row>
        </Container>
    )
}

export default EditProfilePage