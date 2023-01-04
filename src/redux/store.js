import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./reducers/bannerReducer";
import moviesReducer from "./reducers/moviesReducer";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["banner"],
};

const rootReducer = combineReducers({
    banner: bannerReducer,
    movies: moviesReducer,
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
