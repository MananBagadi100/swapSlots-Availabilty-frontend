import { useContext } from 'react'
import '../styles/RequestsStyles.css'
import { AuthContext } from '../context/AuthContext'
import { Link, NavLink, Outlet } from 'react-router-dom'
const Requests = () => {
  const {loginState} = useContext(AuthContext)
  if (!loginState) {  //if user not logged in 
    return (
      <div className="requests-main-div">
        <div className="requests-msg">Please Login to view Requests</div>
        <Link className='requests-login-redirect-btn'to='/login'>Proceed to Login</Link>
      </div>
    )
  }
  else {
    return (
      <div className='requests-full-container'>
        <div className="requests-selection-wrapper">
          <div className="requests-selection-items">
            <NavLink 
              to='incoming' 
              className={({ isActive }) => isActive ? "requested-item-types active-request-tab" : "requested-item-types"}
            >Incoming
            </NavLink>
            <NavLink 
              to='outgoing' 
              className={({ isActive }) => isActive ? "requested-item-types active-request-tab" : "requested-item-types"}
            >Outgoing
          </NavLink>
          </div>
        </div>
        <div className="requests-content-area">
          <Outlet />
        </div>
      </div>
    )
  }
}
export default Requests