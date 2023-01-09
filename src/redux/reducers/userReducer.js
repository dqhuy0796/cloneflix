import _ from "lodash";
import { userActionTypes } from "../constants";

const initState = {
    myList: [],
    myFavourite: [],
    profile: {
        id: 0,
        key: "default",
        name: "Netflix Member",
        avartarUrl: "",
    },
    // data: {
    //     accountId: "",
    //     sessionId: "",
    //     profile: [
    //         {
    //             id: 0,
    //             name: "profile 0",
    //             playlist: [],
    //             favourite: [],
    //         },
    //     ],
    // },
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userActionTypes.addToMyList:
            if (_.isEmpty(state.myList) || _.isEmpty(state.myList.filter((item) => item.id === action.payload.id))) {
                return {
                    ...state,
                    myList: [...state.myList, action.payload],
                };
            }
            return state;
        case userActionTypes.removeFromMyList:
            return {
                ...state,
                myList: state.myList.filter((item) => item.id !== action.payload.id),
            };
        case userActionTypes.selectProfile:
            return {
                ...state,
                profile: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
