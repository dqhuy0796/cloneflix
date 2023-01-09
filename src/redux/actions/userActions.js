import { userActionTypes } from "../constants";

export const addToMyListAction = (data) => ({
    type: userActionTypes.addToMyList,
    payload: data,
});
export const removeFromMyListAction = (data) => ({
    type: userActionTypes.removeFromMyList,
    payload: data,
});
export const selectProfileAction = (data) => ({
    type: userActionTypes.selectProfile,
    payload: data,
});
