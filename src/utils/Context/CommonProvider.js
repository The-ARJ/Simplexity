"use client"
import { UserContext, useUser } from "./UserContext";
import { Provider } from 'react-redux';
import store from '../Redux/Store';

export const CommonProvider = ({ children }) => {
    const userState = useUser();

    return (
        <UserContext.Provider value={userState}>
            <Provider store={store}>
                {children}
            </Provider>
        </UserContext.Provider>
    );
};
