import * as httpRequest from "~/utils/httpRequest";

export const discoverTrendingMovies = async (page = 1) => {
    try {
        const query = "/trending/movie/day";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                page: page,
            },
        });
        return data.results;
    } catch (error) {
        console.log(error);
    }
};
