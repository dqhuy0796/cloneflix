import axios from "axios";
//cannot process .env file

const request = axios.create({
    baseURL: "https://ophim1.com/",
});

export const getApiData = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
