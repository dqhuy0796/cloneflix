import * as httpRequest from "~/utils/httpRequest";

export const fetchNetflixTrending = async (page = 1) => {
    try {
        const result = await httpRequest.fetchApi("/trending/all/week", {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                page: page,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
