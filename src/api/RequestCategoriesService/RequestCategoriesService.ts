
import axios from 'axios'

class RequestCategoriesService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_HOST_URL}/api/requestCategories`
        })


    }

    getAllRequestCategories() {
        return this.api.get('/')
    }

    createRequestCategories(requestCategoryData) {
        return this.api.post(`/create`, requestCategoryData)
    }

}

const requestCategoriesService = new RequestCategoriesService()

export default requestCategoriesService


