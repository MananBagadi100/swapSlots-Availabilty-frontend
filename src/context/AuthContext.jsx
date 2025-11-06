import {createContext, useState, useEffect} from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [loginState,
        setLoginState] = useState(false) //this is the global login state
    const [userDetails,
        setUserDetails] = useState(null)
    const [loginText,
        setLoginText] = useState('Login')
    useEffect(() => {
        const checkLogin = async() => {
            try {
                const {data} = await axiosClient.get("/api/me"); // ✅ check token from cookie
                setLoginState(true);
                setUserDetails(data.user);
                setLoginText("Logged In!");
            } catch (err) {
                setLoginState(false);
                setUserDetails(null);
                setLoginText("Login");
            }
        };

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
            loginState,
            setLoginState,
            userDetails,
            loginText,
            setLoginText
        }}>
            {children}
        </AuthContext.Provider>
    );
}
