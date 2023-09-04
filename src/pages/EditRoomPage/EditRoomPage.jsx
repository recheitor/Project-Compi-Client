import { Container, Row, Col } from 'react-bootstrap'
import EditRoomForm from '../../components/EditRoomForm/EditRoomForm'

const EditRoomPage = () => {

    return (
        <Container className="EditRoomPage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>Edit room</h1>
                    <hr />
                    <EditRoomForm />
                </Col>
            </Row>
        </Container>
    )
}

export default EditRoomPage