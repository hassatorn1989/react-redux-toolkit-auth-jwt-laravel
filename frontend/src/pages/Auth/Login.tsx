import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/features/auth/authSlice';

const Login = () => {
    const { isLoading, isLoggedIn } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm()
    const submitForm = async (data: any) => {
        await dispatch(login(data));
        reset();
    }
    return (
        <>
            {
                isLoggedIn ? navigate('/home') :
                    <form
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <h1>Login</h1>
                        <input type="text" placeholder="Username" {...register('username')} /><br />
                        <input type="password" placeholder="Password"  {...register('password')} /><br />
                        <button type="submit">
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
            }
        </>
    )
}

export default Login