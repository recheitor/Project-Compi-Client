import { Container, Row, Col } from 'react-bootstrap'
import AddAmenityForm from '../../components/AddAmenityForm/AddAmenityForm'

const AddAmenityPage = () => {

    return (
        <Container className="AddAmenityPage">
            <Row className='justify-content-center'>
                <Col md={{ span: 4 }}>
                    <h1>Add amenity</h1>
                    <hr />
                    <AddAmenityForm />
                </Col>
            </Row>
        </Container>
    )
}

export default AddAmenityPage