import { Container, Row, Col } from 'react-bootstrap'
import UsersList from '../../components/UsersList/UsersList'

const UsersListPage = () => {

    return (
        <Container className="UsersList">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <hr />
                    <UsersList />
                </Col>
            </Row>
        </Container>
    )
}

export default UsersListPage