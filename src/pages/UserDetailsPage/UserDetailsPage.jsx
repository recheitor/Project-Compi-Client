import { Container, Row, Col } from 'react-bootstrap'
import UserDetails from '../../components/UserDetails/UserDetails'

const UserDetailsPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1>User Details</h1>
                    <hr />
                    <UserDetails />
                </Col>
            </Row>
        </Container>
    )
}

export default UserDetailsPage

