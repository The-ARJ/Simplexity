// "use client"
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'js-cookie';
import cartReducer from './CartSlice';
import reviewReducer from './ReviewSlice';
import UserReducer from './UserSlice';

const persistConfig = {
    key: 'user',
    storage: new CookieStorage(Cookies),
    whitelist: ['user']
};

const persistedUserReducer = persistReducer(persistConfig, UserReducer);

const store = configureStore({
    reducer: {
        cart: cartReducer,
        reviews: reviewReducer,
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
