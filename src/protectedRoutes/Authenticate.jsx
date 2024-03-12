import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getSessionStorageRole } from '../layouts/sidebarItems';

const Authenticate = () => {
    const tokenData = getSessionStorageRole();
    const email = tokenData?.email ;           
    
    return email?<Outlet/>:<Navigate to='/login' replace/>
}

export default Authenticate;