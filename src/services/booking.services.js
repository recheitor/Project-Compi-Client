import axios from 'axios'

class BookingService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/bookings`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createBooking(bookingData) {
        return this.api.post('/create-booking', bookingData)
    }

    getAllBookings() {
        return this.api.get('/get-all-bookings')
    }

    getAllRoomBookings(room_id) {
        return this.api.get(`/get-all-room-bookings/${room_id}`)
    }

    getAllMyBookings(user_id) {
        return this.api.get(`/get-all-my-bookings/${user_id}`)
    }

    getOneBooking(booking_id) {
        return this.api.get(`/${booking_id}`)
    }

    editBooking(booking_id, bookingData) {
        return this.api.post(`/${booking_id}/edit`, bookingData)
    }

    deleteBooking(booking_id) {
        return this.api.post(`/${booking_id}/delete`)
    }
}

const bookingService = new BookingService()

export default bookingService



