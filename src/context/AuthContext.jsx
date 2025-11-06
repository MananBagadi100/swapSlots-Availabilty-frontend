import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginState , setLoginState] = useState(false)  //this is the global login state
  const [userDetails , setUserDetails] = useState(null)
  const [loginText , setLoginText] = useState('Login')



  return (
    <AuthContext.Provider value={{loginState,setLoginState,userDetails,loginText,setLoginText}}>
      {children}
    </AuthContext.Provider>
  );
}
