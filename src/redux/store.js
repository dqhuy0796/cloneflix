import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./reducers/bannerReducer";
import moviesReducer from "./reducers/moviesReducer";
import tvShowsReducer from "./reducers/tvShowsReducer";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./reducers/modalReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["movies"],
};

const rootReducer = combineReducers({
    banner: bannerReducer,
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
