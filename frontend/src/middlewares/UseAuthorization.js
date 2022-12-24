import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const UseAuthorization = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();

    console.log(user)

    // state = {{ from: location }} replace

    return (isAuthenticated ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />)

}

export default UseAuthorization