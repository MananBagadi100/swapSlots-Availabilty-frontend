import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import './App.css'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import Requests from './pages/Requests'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Incoming from "./components/Incoming";
import Outgoing from "./components/Outgoing";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axiosClient from "./api/axiosClient";

export default function App() {
  const [userDetails , setUserDetails] = useState({})
  const {setLoginState,setLoginText} = useContext(AuthContext)
    // Run once when app first loads we check the login state
  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await axiosClient.get("api/me"); // backend verifies cookie token
        if (!response.data.isLoggedIn) {  //if isLoggedIn exists and is false
          setLoginState(false)  //the server response with this parameter if user not logged in or jwt is false
        }
        else {
          setLoginState(true)
          setLoginText('Logged In !')
          setUserDetails(response.data.user); // logged in user details returned by backend
        }
      } catch (error) {
        console.log("error is ",error)
        setLoginState(false); // not logged in user if error in api request
      } 
    }
    checkLogin();
  }, []);
  return (
    <div className="all-pages-container">
      <BrowserRouter>
        <Navbar />
        <div className="page-contents">
        <Routes>
          
            {/* Public routes below*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes below (handled inside each page component) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/requests" element={<Requests />} >
              <Route path="incoming" element={<Incoming />} />
              <Route path="outgoing" element={<Outgoing />} />
            </Route>

            {/* Default redirect */}
            {/* <Route path="*" element={<Login />} /> */}
          
        </Routes>
        </div>
      </BrowserRouter>
    </div>
      
  );
}