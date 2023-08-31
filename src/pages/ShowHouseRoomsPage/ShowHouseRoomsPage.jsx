import { Container, Row, Col } from 'react-bootstrap'
import HouseRooms from '../../components/HouseRooms/HouseRooms'


const ShowHouseRoomsPage = () => {

    return (
        <Container className="ShowHouseRoomsPage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>House - Renting Rooms details</h1>
                    <h3>Eliminar todos los datos no necesarios</h3>


                    <hr />


                    {/* Añadir contexto local */}
                    <HouseRooms />
                    {/* Añadir contexto local */}


                </Col>

            </Row>

        </Container>
    )
}

export default ShowHouseRoomsPage