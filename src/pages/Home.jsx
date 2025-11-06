import { Link } from "react-router-dom"
import '../styles/HomeStyles.css'
const Home = () => {
    return (
        <div className="home-main-div">
            <div className="welcome-message">Welcome ! Please Login to continue</div>
            <Link className="login-redirect-btn" to='/login'>Proceed to login</Link>
        </div>
    )
}
export default Home