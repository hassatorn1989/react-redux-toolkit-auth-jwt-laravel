import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Authentication = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(userInfo);
        
        // if (!userInfo) {
        //     navigate('/')
        // }
    }, [userInfo])
    // return (
    //     (!userInfo) ? 
    //         <Navigate to="/" /> : 
    //         <></>
    // )
}

export default Authentication