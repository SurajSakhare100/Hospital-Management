import React, { useContext } from "react";
export const Auth=React.createContext(
    {
        status:false,
        login:()=>{},
        logout:()=>{},
    }
);
export const AuthProvider=Auth.Provider;

export const useapi=()=>{
    return useContext(Auth)
}

