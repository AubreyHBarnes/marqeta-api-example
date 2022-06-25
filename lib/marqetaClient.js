import axios from "axios";

function createClient(baseUrl, username, password) {
    return axios.create({
        baseURL: baseUrl || process.env.REACT_BASE_URL,
        timeout: 1000,
        auth: {
            username: username || process.env.REACT_APP_TOKEN,
            password: password || process.env.REACT_ACCESS_TOKEN
        }
    })
}

export default createClient()