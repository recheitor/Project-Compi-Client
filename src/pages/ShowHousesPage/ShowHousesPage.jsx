import { Container, Row, Col } from 'react-bootstrap'
import Houses from '../../components/Houses/Houses'

const ShowHousesPage = () => {

    return (
        <Container className="ShowHouses">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>Houses</h1>
                    <h3>Eliminar todos los datos no necesarios</h3>
                    <hr />
                    <Houses />
                </Col>
            </Row>
        </Container>
    )
}

export default ShowHousesPage