import axios from 'axios'

class RoomService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/rooms`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createRoom(roomData) {
        return this.api.post('/create-room', roomData)
    }

    getAllRooms() {
        return this.api.get('/get-all-rooms')
    }

    getOneRoom(room_id) {
        return this.api.get(`/${room_id}`)
    }

    editRoom(room_id, roomData) {
        return this.api.post(`/${room_id}/edit`, roomData)
    }

    deleteRoom(room_id, house_id) {

        return this.api.post(`/${room_id}/delete`, house_id)
    }
}

const roomService = new RoomService()

export default roomService



