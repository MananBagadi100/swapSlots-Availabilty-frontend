import { Link, useNavigate } from 'react-router-dom'
import '../styles/SignupStyles.css'
import { useForm } from 'react-hook-form'
import axiosClient from '../api/axiosClient'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
const Signup = () => {
    const [serverError , setServerError] = useState('')
    const navigate = useNavigate()
    const {setLoginState,setLoginText} = useContext(AuthContext)
        const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors,isSubmitting,},
    } = useForm({ criteriaMode : 'all'})
    const onSubmit = async (data) => {
        console.log(data)
        clearErrors()
        try {
            const response = await axiosClient.post('/auth/signup',data)
            if (response.status === 200) {
                setLoginState(true)
                setLoginText('Logged In!')
                setServerError('')
                navigate('/dashboard')
            }
        }
        catch (error) {
            console.log('The full error is ',error)
            setServerError(`${error.response.data.message}`)
        }
    }
    return (
        <div className='main-signup-full-container'>
            <div className="signup-dialog-box">
                <div className="dialog-box-heading-area">Sign Up</div>
                <div className="dialog-box-content-area">
                    <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="signup-input-field-wrapper">
                            <input
                                type='text'
                                placeholder='Enter your name'
                                className='signup-input-fields'
                                {...register("name",
                                    {required:{value:true,message:"Name is required"}}
                                )}
                            />
                        </div>
                        {errors.name && <div className='error-div'>{errors.name.message}</div>}
                        <div className="signup-input-field-wrapper">
                            <input
                                type='text'
                                placeholder='Enter your email'
                                className='signup-input-fields'
                                {...register("email",
                                    {required:{value:true,message:"Email is required"}}
                                )}
                            />
                        </div>
                        {errors.email && <div className='error-div'>{errors.email.message}</div>}
                        <div className="signup-input-field-wrapper">
                            <input
                                type='password'
                                placeholder='Enter your password'
                                className='signup-input-fields'
                                {...register("password",
                                    {required:{value:true,message:"Password is required"}}
                                )}
                            />
                        </div>
                        {errors.password && <div className='error-div'>{errors.password.message}</div>}
                        <div className="serverErrors">{serverError}</div>
                        <div className="signup-submit-btn-wrapper">
                            <input
                                className='signup-details-submit-btn'
                                type='submit'
                                value='Submit'
                                disabled={isSubmitting} 
                            />
                        </div>
                    </form>
                    <div className='login-redirect-link'>Existing User ?<Link to='/login'>Login Now!</Link></div>
                </div>
            </div>
        </div>
    )
}
export default Signup