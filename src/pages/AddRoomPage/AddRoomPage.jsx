import { Container, Row, Col } from 'react-bootstrap'
import AddRoomForm from '../../components/AddRoomForm/AddRoomForm'


const AddRoomPage = () => {

    return (
        <Container className="AddRoomPage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>Add room</h1>

                    <hr />


                    {/* Añadir contexto local */}
                    <AddRoomForm />
                    {/* Añadir contexto local */}


                </Col>

            </Row>

        </Container>
    )
}

export default AddRoomPage