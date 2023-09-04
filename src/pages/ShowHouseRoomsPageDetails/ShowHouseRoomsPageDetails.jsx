import { Container, Row, Col } from 'react-bootstrap'
import HouseRoomsDetails from '../../components/HouseRoomsDetails/HouseRoomsDetails'

const ShowHouseRoomsPageDetails = () => {

    return (
        <Container className="ShowHouseRoomsPageDetails">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>House - Renting Rooms details</h1>
                    <hr />
                    <HouseRoomsDetails />
                </Col>
            </Row>
        </Container>
    )
}

export default ShowHouseRoomsPageDetails