import { Card, Col } from "react-bootstrap"
import TripleCheckbox from '../TripleCheckbox/TripleCheckbox'

const AmenityCard = ({ name, icon }) => {

    return (
        <Col lg={{ span: 4 }} md={{ span: 6 }}>
            <article className='AmenityCard mb-3'>
                <Card>
                    <TripleCheckbox />
                    <Card.Img variant="top" src={icon} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                </Card>
            </article>
        </Col>
    )
}

export default AmenityCard