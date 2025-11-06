import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "../styles/DashboardStyles.css";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const {loginState} = useContext(AuthContext)
  if (!loginState) {
    return (
      <div className="dashboard-main-div">
        <div className="dashboard-msg">Please Login to view dashboard</div>
        <Link className='dashboard-login-redirect-btn'to='/login'>Proceed to Login</Link>
      </div>
    )
  }
  else {
    return (
      <div>
        yol
      </div>
    )
  }
  
}
export default Dashboard