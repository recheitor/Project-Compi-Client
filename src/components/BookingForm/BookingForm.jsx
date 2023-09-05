import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import bookingServices from '../../services/booking.services'
import { useNavigate, useParams } from 'react-router-dom'

import Calendar from '../DayPicker/DayPicker'

const BookingForm = () => {

    const navigate = useNavigate()
    const { rooms_house_id: room_id } = useParams()

    const [allBookingsData, setAllBookingsData] = useState([])
    const [bookingConflict, setBookingConflict] = useState()

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
                console.log('DATA', data)
                setAllBookingsData(data)
                console.log('ALLBOOKINGSDATA', allBookingsData)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setBookingData({ ...bookingData, [name]: value })
    }
    let conflicto = false
    const conflict = () => {
        allBookingsData.forEach(eachBooking => {

            if ((bookingData.entry >= eachBooking.bookingDates.entry && bookingData.entry <= eachBooking.bookingDates.exit) ||
                (bookingData.exit >= eachBooking.bookingDates.entry && bookingData.exit <= eachBooking.bookingDates.exit)) {
                console.log("no puedes reservar")
                conflicto = true
                console.log(conflicto)
            }
        })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        conflict()

        setTimeout(() => {
            if (!conflicto) {
                bookingServices
                    .createBooking(bookingData)
                    .then(() => {
                        console.log('SI')
                        // navigate('/')
                    })
                    .catch(err => console.log(err))
            }
        }, 2000);

    }

    return (
        <div className="BookingForm">

            <Calendar />

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
                    <Button variant="dark" type="submit">{bookingConflict ? "no reservas" : "reserva"}</Button>
                </div>
            </Form>
        </div>
    )
}

export default BookingForm
