import { Container, Row, Col } from 'react-bootstrap'
import AddHouseForm from '../../components/AddHouseForm/AddHouseForm'


const AddHousePage = () => {

    return (
        <Container className="AddHousePage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>Add house</h1>
                    <hr />
                    <AddHouseForm />
                </Col>
            </Row>
        </Container>
    )
}

export default AddHousePage