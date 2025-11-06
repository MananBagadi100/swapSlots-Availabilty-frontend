import { Link, useNavigate } from 'react-router-dom'
import '../styles/LoginStyles.css'
import { useForm } from 'react-hook-form'
import axiosClient from '../api/axiosClient'
import { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext";
const Login = () => {
    const {loginState,setLoginState,setLoginText} = useContext(AuthContext)
    const [serverError , setServerError] = useState('')
    const navigate = useNavigate()
    async function handleLogout () {
        try {
            const response = await axiosClient.post('/api/logout',{})
            if (!response.data.isLoggedIn) {
                setLoginState(false)
                setLoginText('Login')
            }
        }
        catch (error) {
            console.log('Error in the logout button ',error)
        }
    }
        const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors,isSubmitting,},
    } = useForm({ criteriaMode : 'all'})
    const onSubmit = async (data) => {
        await axiosClient.post("/api/logout").catch(()=>{});
        console.log(data)
        clearErrors()
        try {
            const response = await axiosClient.post('/auth/login',data)
            console.log('the response from the server is ',response)
            if (response.status === 200) {
                setLoginState(true)
                setLoginText('Logged In!')
                setServerError('')
                navigate('/dashboard')
            }
        }
        catch (error) {
            if (error.response) {
                console.log('FULL ERROR',error)
                setServerError(`${error.response.data.message}`)
                return
            }
            //other server errors
            setServerError(`Some unknown error occured , Please try after some time`)
        }
    }
    console.log('the global login state is ',loginState)
    if (loginState === true) {
        return (
            <div className='main-login-full-container'>
                <div className='logged-in-msg'>You are alrady logged In !</div>
                <button  className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>

        )
    }
    else {
        return (
            <div className='main-login-full-container'>
                <div className="login-dialog-box">
                    <div className="dialog-box-heading-area">Login</div>
                    <div className="dialog-box-content-area">
                        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-input-field-wrapper">
                                <input
                                    type='text'
                                    placeholder='Enter your email'
                                    className='login-input-fields'
                                    {...register("email",
                                        {required:{value:true,message:"Email is required"}}
                                    )}
                                />
                            </div>
                            {errors.email && <div className='error-div'>{errors.email.message}</div>}
                            <div className="login-input-field-wrapper">
                                <input
                                    type='password'
                                    placeholder='Enter your password'
                                    className='login-input-fields'
                                    {...register("password",
                                        {required:{value:true,message:"Password is required"}}
                                    )}
                                />
                            </div>
                            {errors.password && <div className='error-div'>{errors.password.message}</div>}
                            <div className="wrongCredentails-error" style={{display:'flex',color:'red',fontSize:'14px',justifyContent:'center'}}>{serverError}</div>
                            <div className="login-submit-btn-wrapper">
                                <input
                                    className='login-details-submit-btn'
                                    type='submit'
                                    value='Submit'
                                    disabled={isSubmitting} 
                                />
                            </div>
                        </form>
                        <div className='signup-redirect-link'>New User ?<Link to='/signup'>Signup Now !</Link></div>
                    </div>
                </div>
            </div> 
        )
    }
}
export default Login