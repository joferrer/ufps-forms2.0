
import axios from "axios";

export const ufpsformsApi = axios.create({
    baseURL: 'https://ufpsforms-production.up.railway.app/api'
})

