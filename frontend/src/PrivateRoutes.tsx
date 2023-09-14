import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { me, refreshToken } from './redux/features/auth/authSlice';
import { Outlet, useNavigate } from 'react-router-dom';
const PrivateRoutes = () => {
    const { isAuth, user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMe =  async () => {
            await dispatch(refreshToken());
            await dispatch(me());
        }
        fetchMe();
    }, [])

    if (isAuth === false) {
        navigate('/');
    } else if (isAuth === true && user !== null) {
        return <Outlet />
    }
}

export default PrivateRoutes