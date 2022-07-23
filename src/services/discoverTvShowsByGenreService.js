import * as httpRequest from "~/utils/httpRequest";

export const discoverTvShowsByGenre = async (genre, page = 1) => {
    try {
        const query = "/discover/tv";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                with_genres: genre,
                page: page,
            },
        });
        return data.results;
    } catch (error) {
        console.log(error);
    }
};
