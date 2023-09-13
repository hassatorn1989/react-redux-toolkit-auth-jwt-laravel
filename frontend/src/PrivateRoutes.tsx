import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { me } from './redux/features/auth/authSlice';
import { Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMe =  () => {
             dispatch(me());
        }
        fetchMe();
    }, [])


    // // if () {
    //     return (
    //         <>
    //             {children}
    //         </>
    //     )
    // // }
    return <Outlet />
}

export default PrivateRoutes