import axios from 'axios'

class AmenityService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/amenities`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createAmenity(amenityData) {
        return this.api.post('/create-amenity', amenityData)
    }

    getAllAmenities() {
        return this.api.get('/get-all-amenities')
    }

    getOneAmenity(amenity_id) {
        return this.api.get(`/${amenity_id}`)
    }

    editAmenity(amenity_id, amenityData) {
        return this.api.post(`/${amenity_id}/edit`, amenityData)
    }

    deleteAmenity(amenity_id) {
        return this.api.post(`/${amenity_id}/delete`)
    }
}

const amenityService = new AmenityService()

export default amenityService



