import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, me } from '../redux/features/auth/authSlice';

const Home = () => {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMe =  () => {
             dispatch(me());
        }
        fetchMe();
    }, [])

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            <h1>Home</h1>
            <h2>{user?.user.name}</h2>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
    
}

export default Home