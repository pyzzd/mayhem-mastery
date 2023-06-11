import axios from 'axios'

export const website = "https://apis.caikun.site"
const service = axios.create({
    baseURL: website,
})

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data
        }
    })

export default service