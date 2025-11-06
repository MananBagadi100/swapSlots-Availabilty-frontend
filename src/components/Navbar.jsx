import { Link,NavLink } from "react-router-dom";
import {AuthProvider} from "../context/AuthContext";
import {AuthContext} from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import '../styles/NavbarStyles.css'
import { useContext, useState } from "react";

const Navbar = () => {
  const {loginState,loginText} = useContext(AuthContext)
  return (
    <div className="navbar-main-container">
      <div className="navbar-contents">
        <nav className="navbar-items">
          <NavLink to='dashboard' className='navbar-option'>Dashboard</NavLink>
          <NavLink to='marketplace' className='navbar-option'>Marketplace</NavLink>
          <NavLink to='requests' className='navbar-option'>Requests</NavLink>
        </nav>
        <div className="display-login-state-wrapper">
          <Link className="login-state-display" to='/login'>{loginText}</Link>
        </div>
      </div>
    </div>
  )
}
export default Navbar