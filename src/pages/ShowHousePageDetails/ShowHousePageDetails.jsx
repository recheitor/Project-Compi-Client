import { Container, Row, Col } from 'react-bootstrap'
import HouseDetails from '../../components/HouseDetails/HouseDetails'

const ShowHousePageDetails = () => {

    return (
        <Container className="ShowHousePageDetails">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>House - Renting details</h1>
                    <hr />
                    <HouseDetails />
                </Col>
            </Row>
        </Container>
    )
}

export default ShowHousePageDetails