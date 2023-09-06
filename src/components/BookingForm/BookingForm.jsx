import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import bookingServices from '../../services/booking.services'
import { useNavigate, useParams } from 'react-router-dom'


const BookingForm = () => {

    const navigate = useNavigate()
    const { rooms_house_id: room_id } = useParams()

    const [allBookingsData, setAllBookingsData] = useState([])
    const [bookingConflict, setBookingConflict] = useState(true)

    const [bookingData, setBookingData] = useState({
        room: room_id,
        entry: '',
        exit: '',
        price: 0
    })

    useEffect(() => {
        getBookings()
    }, [!allBookingsData.length])

    const getBookings = () => {
        bookingServices
            .getAllRoomBookings(room_id)
            .then(({ data }) => {
                setAllBookingsData(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget

        setBookingConflict(false)

        setBookingData(prevBookingData => {
            const updatedBookingData = { ...prevBookingData, [name]: value }

            allBookingsData.forEach(eachBooking => {

                eachBooking.bookingDates.entry = eachBooking.bookingDates.entry.split('T')[0]
                eachBooking.bookingDates.exit = eachBooking.bookingDates.exit.split('T')[0]

                if ((updatedBookingData.entry >= eachBooking.bookingDates.entry && updatedBookingData.entry <= eachBooking.bookingDates.exit) ||
                    (updatedBookingData.exit >= eachBooking.bookingDates.entry && updatedBookingData.exit <= eachBooking.bookingDates.exit) ||
                    (!updatedBookingData.entry || !updatedBookingData.exit) ||
                    (updatedBookingData.entry > updatedBookingData.exit)) {

                    setBookingConflict(true)
                }
            })

            return updatedBookingData
        })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        if (!bookingConflict) {

            bookingServices
                .createBooking(bookingData)
                .then(() => {
                    console.log('SI RESERVAS')
                    navigate('/rooms')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="BookingForm">

            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="entry">
                    <Form.Label>Entry</Form.Label>
                    <Form.Control
                        type="date"
                        value={bookingData.entry}
                        name="entry"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exit">
                    <Form.Label>Exit</Form.Label>
                    <Form.Control
                        type="date"
                        value={bookingData.exit}
                        name="exit"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={bookingConflict}>{bookingConflict ? "Try other days" : "Book"}</Button>
                </div>
            </Form>
        </div>
    )
}

export default BookingForm
