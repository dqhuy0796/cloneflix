import axios from "axios";

export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const discover = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export const fetchApi = async (url, params = {}) => {
    const response = await discover.get(url, params);
    return response.data;
};

export default discover;
