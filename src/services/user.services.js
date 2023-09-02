import axios from 'axios'

class UserService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/users`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    users() {
        return this.api.get('/users')
    }

    user(user_id) {
        return this.api.get(`/${user_id}`)
    }

    editUser(user_id, userData) {
        return this.api.post(`/${user_id}/edit`, userData)
    }

    deleteUser(user_id) {
        return this.api.post(`/${user_id}/delete`)
    }
}

const userService = new UserService()

export default userService