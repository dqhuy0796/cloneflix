import { movieService, tvShowService } from "~/services";
import { modalActionTypes } from "../constants";

export const setPreviewModal = (position, data) => (dispatch) => {
    dispatch(showPreviewModal({ position: position, data: data }));
    const isTvShows = !!data.first_air_date;
    dispatch(setPreloadDetailsModal(isTvShows, data.id));
};

export const showPreviewModal = (payload) => ({
    type: modalActionTypes.showPreview,
    payload: payload,
});

export const hidePreviewModal = () => ({
    type: modalActionTypes.hidePreview,
});

export const setPreloadDetailsModal = (isTvShows, id) => async (dispatch) => {
    const data = isTvShows ? await tvShowService.getTvShowDetails(id) : await movieService.getMovieDetails(id);
    dispatch(preloadDetailsModal(data));
};

export const preloadDetailsModal = (data) => ({
    type: modalActionTypes.preloadDetails,
    payload: data,
});

export const showDetailsModal = () => ({
    type: modalActionTypes.showDetails,
});

export const hideDetailsModal = () => ({
    type: modalActionTypes.hideDetails,
});
