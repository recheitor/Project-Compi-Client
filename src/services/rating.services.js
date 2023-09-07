import axios from 'axios'

class RatingService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/ratings`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createRating(ratingData) {
        return this.api.post('/rate', ratingData)
    }

    deleteRating(rating_id) {
        return this.api.post(`/${rating_id}/delete`)
    }
}

const ratingService = new RatingService()

export default ratingService