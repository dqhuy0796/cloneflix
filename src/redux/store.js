import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import pageReducer from "./reducers/pageReducer";
import preloadReducer from "./reducers/preloadReducer";
import userReducer from "./reducers/userReducer";

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./reducers/modalReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["preload", "page", "user"],
};

const rootReducer = combineReducers({
    preload: preloadReducer,
    modal: modalReducer,
    page: pageReducer,
    user: userReducer,
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
