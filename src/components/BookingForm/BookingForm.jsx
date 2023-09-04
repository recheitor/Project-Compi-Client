import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import bookingServices from '../../services/booking.services'
import roomService from '../../services/room.services'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'



// room: {
//     type: Schema.Types.ObjectId,
//         ref: 'Room'
// },
// user: {
//     type: Schema.Types.ObjectId,
//         ref: 'User'
// },
// bookingDates: {
//     entry: {
//         type: Date,
//             },
//     exit: {
//         type: Date,
//             }
// },
// // guestsNumber: {
// //     type: Number,
// // },
// price: {
//     type: Number,
//         },
//         // rating: [{
//         //     type: Schema.Types.ObjectId,
//         //     ref: 'Rating'
//         // }],





const BookingForm = () => {

    const [bookingData, setBookingData] = useState({
        bookingDates: {
            entry: Date,
            exit: Date
        }
    })

    const { room_id } = useParams()
    const { loggedUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const getBookings = () => {
        bookingServices
            .getAllBookings()
            .then(({ data }) => setBookingData({ ...roomData, house: data }))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getBookings()
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setBookingData({ ...bookingData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        bookingServices
            .createBooking(bookingData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <div className="BookingForm">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="entry">
                    <Form.Label>Entry</Form.Label>
                    <Form.Control
                        type="date"
                        value={bookingData.bookingDates.entry}
                        name="entry"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exit">
                    <Form.Label>Exit</Form.Label>
                    <Form.Control
                        type="date"
                        value={bookingData.bookingDates.exit}
                        name="exit"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Booking</Button>
                </div>
            </Form>
        </div>
    )
}

export default BookingForm
