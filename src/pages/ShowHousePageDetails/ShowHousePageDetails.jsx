import { Container, Row, Col } from 'react-bootstrap'
import HouseDetails from '../../components/HouseDetails/HouseDetails'


const ShowHousePageDetails = () => {

    return (
        <Container className="ShowHousePageDetails">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>House - Renting details</h1>

                    <hr />


                    {/* Añadir contexto local */}
                    <HouseDetails />
                    {/* Añadir contexto local */}


                </Col>

            </Row>

        </Container>
    )
}

export default ShowHousePageDetails