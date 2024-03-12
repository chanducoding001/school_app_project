import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getSessionStorageRole } from '../layouts/sidebarItems';
const Protected = ({role}) => {
    const sessionRole = getSessionStorageRole();
    return +sessionRole.role===+role?<Outlet/>:<Navigate to='/login' replace/>
}

export default Protected