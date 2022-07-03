import * as httpRequest from "~/utils/httpRequest";

export const loadPlaylist = async (page, type = "less") => {
    try {
        const result = await httpRequest.getApiData("danh-sach/phim-moi-cap-nhat", {
            params: {
                page: page,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
