import * as httpRequest from "~/utils/httpRequest";

export const fetchTvShowGenres = async () => {
    try {
        const query = "/genre/movie/list";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
