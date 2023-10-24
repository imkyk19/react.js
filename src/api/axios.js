import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.themoviedb.org/3",
    params: {
        api_key: "d532e43778b5084634f5a37959196b2e",
        language: "en-US"
    }
})

//다른 곳에서 사용 위함
export default instance;