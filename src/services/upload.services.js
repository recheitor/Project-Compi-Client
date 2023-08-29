import axios from 'axios'

class UploadServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/uploads`
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }


    uploadimages(imageForm) {
        return this.api.post('/images', imageForm)
    }
}

const uploadServices = new UploadServices()

export default uploadServices
