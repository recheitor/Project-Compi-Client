import { Container, Row, Col } from 'react-bootstrap'
import Houses from '../../components/Houses/Houses'

const HomePage = () => {

    return (
        <Container className="HomePage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>COMPI</h1>
                    <Houses />
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage