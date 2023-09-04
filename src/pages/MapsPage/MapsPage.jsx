import { Container, Row, Col } from 'react-bootstrap'
import Maps from '../../components/Maps/Maps'


const MapsPage = () => {

    return (
        <Container className="Maps">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>Google Maps</h1>

                    <hr />


                    {/* Añadir contexto local */}
                    <Maps />
                    {/* Añadir contexto local */}


                </Col>

            </Row>

        </Container>
    )
}

export default MapsPage