import { useContext } from 'react'
import '../styles/MarketplaceStyles.css'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const Marketplace = () => {
  const {loginState} = useContext(AuthContext)
  if (!loginState) {  //if user not logged in 
    return (
      <div className="marketPlace-main-div">
        <div className="marketPlace-msg">Please Login to view Marketplace</div>
        <Link className='marketPlace-login-redirect-btn'to='/login'>Proceed to Login</Link>
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
export default Marketplace