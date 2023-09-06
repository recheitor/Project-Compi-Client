import { Container, Row, Col } from 'react-bootstrap'
import HouseRooms from '../../components/HouseRooms/HouseRooms'

const ShowHouseRoomsPage = () => {

    return (
        <Container className="ShowHouseRoomsPage">
            <h1>House - Renting Rooms details</h1>
            <hr />
            <HouseRooms />
        </Container>
    )
}

export default ShowHouseRoomsPage