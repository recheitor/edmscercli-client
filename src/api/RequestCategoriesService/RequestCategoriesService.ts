import axios, { AxiosInstance }  from "axios";

class RequestCategoriesService {
  api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_HOST_URL}/api/requestCategories`
        })
    }

    getAllRequestCategories() {
        return this.api.get('/')
    }

    createRequestCategories(requestCategoryData: string) {
        return this.api.post(`/create`, requestCategoryData)
    }

}

const requestCategoriesService = new RequestCategoriesService()

export default requestCategoriesService


