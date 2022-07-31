import * as httpRequest from "~/utils/httpRequest";

export const fetchTvShowSeason = async (id, season = 1) => {
    try {
        const data = await httpRequest.fetchApi(`tv/${id}/season/${season}`, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
