import { Container, Row, Col } from 'react-bootstrap'
import UserDetails from '../../components/UserDetails/UserDetails'

const UserDetailsPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <UserDetails />
                </Col>
            </Row>
        </Container>
    )
}

export default UserDetailsPage

