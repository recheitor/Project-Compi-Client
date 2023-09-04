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

    getHousesbyType(rent_type, searchQuery) {
        return this.api.get(`/get-houses/${rent_type}?${searchQuery}`,)
    }

    getHousesbyOwnerId(user_id) {
        return this.api.get(`/get-my-houses/${user_id}`)
    }

    getOneHouse(house_id) {
        return this.api.get(`/get-house/${house_id}`)
    }

    getOneHouseRoom(house_id) {
        return this.api.get(`/get-rooms-house/${house_id}`)
    }

    editHouse(house_id, houseData) {
        return this.api.post(`/${house_id}/edit`, houseData)
    }

    addFavoriteHouse(house_id) {
        return this.api.post(`/${house_id}/add-favorite`)
    }

    deleteFavoriteHouse(house_id) {
        return this.api.post(`/${house_id}/delete-favorite`)
    }
    deleteHouse(house_id) {
        return this.api.post(`/${house_id}/delete`)
    }
}

const houseService = new HouseService()

export default houseService



