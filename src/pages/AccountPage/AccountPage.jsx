import { useContext } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Container, Row, Col } from 'react-bootstrap'

const AccountPage = () => {

    const { loggedUser } = useContext(AuthContext)

    return (
        <Container className="HomePage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>{loggedUser.firstName}'s account</h1>

                </Col>

            </Row>

        </Container>
    )
}

export default AccountPage