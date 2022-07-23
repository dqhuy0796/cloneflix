import * as httpRequest from "~/utils/httpRequest";

export const discoverTopRatedTVShows = async (page = 1) => {
    try {
        const query = "/tv/top_rated";
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
