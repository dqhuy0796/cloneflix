import { preloadActionTypes } from "../constants";
import { browseService } from "~/services";

export const setAllGenres = (data) => ({
    type: preloadActionTypes.getAllGenres,
    payload: data,
});

export const getAllGenres = () => async (dispatch) => {
    const response = await browseService.getAllGenres();
    dispatch(setAllGenres(response));
};
