"use client"
import { UserContext, useUser } from "./UserContext";

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    const userState = useUser();

    return (
        <UserContext.Provider value={userState}>{children}</UserContext.Provider>
    );
};
