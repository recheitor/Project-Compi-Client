import { Container, Row, Col } from 'react-bootstrap'
import EditHouseForm from '../../components/EditHouseForm/EditHouseForm'


const EditHousePage = () => {

    return (
        <Container className="EditHousePage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>Edit house</h1>

                    <hr />


                    {/* Añadir contexto local */}
                    <EditHouseForm />
                    {/* Añadir contexto local */}


                </Col>

            </Row>

        </Container>
    )
}

export default EditHousePage