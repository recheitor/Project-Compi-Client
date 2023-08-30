import axios from 'axios'

class HouseService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/houses`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createHouse(houseData) {
        return this.api.post('/create-house', houseData)
    }

    getAllHouses() {
        return this.api.get('/get-all-houses')
    }

    getHousesbyType(rent_type) {
        return this.api.post(`/get-houses/${rent_type}`)
    }

    getHousesbyOwnerId(user_id) {
        return this.api.get(`/get-my-houses/${user_id}`)
    }

    getOneHouse(house_id) {
        return this.api.get(`/${house_id}`)
    }

    editHouse(house_id, houseData) {
        return this.api.post(`/${house_id}/edit`, houseData)
    }

    deleteHouse(house_id) {
        return this.api.post(`/${house_id}/delete`)
    }
}

const houseService = new HouseService()

export default houseService



