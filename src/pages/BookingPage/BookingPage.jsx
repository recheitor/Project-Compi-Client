import { Container, Row, Col } from 'react-bootstrap'
import BookingForm from '../../components/BookingForm/BookingForm'
const BookingPage = () => {
    return (
        <Container className="BookingPage">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>Booking</h1>
                    <hr />
                    <BookingForm />
                </Col>
            </Row>
        </Container>
    )
}
export default BookingPage