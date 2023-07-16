// commonProvider.js

"use client"

import { ThemeProvider } from 'next-themes'
import { UserContext, useUser } from "./UserContext";

export const CommonProvider = ({ children }) => {
    const userState = useUser();

    return (
        <UserContext.Provider value={userState}>
            {/* <ThemeProvider attribute='class'> */}
                {children}
            {/* </ThemeProvider> */}
        </UserContext.Provider>
    );
};
