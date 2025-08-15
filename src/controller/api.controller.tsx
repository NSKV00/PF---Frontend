import axios from "axios"

export const apiController = axios.create({
    baseURL:"http://localhost:3001",
    timeout: 6000
})