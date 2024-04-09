import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './userSlice'
import { persistReducer , persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
    key: 'user_crm',
    storage
}

const persistedAuthUserReducer = persistReducer(userPersistConfig  , userAuthReducer);

export const store = configureStore({

    reducer : {
        user_crm: persistedAuthUserReducer
    }
})

export const persistor = persistStore(store);