import React from 'react'
import { Outlet , Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const PrivatePages = () => {

    const loggedUser = useSelector((state) => state.user_crm.userData);

  return (
    <>
        {loggedUser ? <Outlet/> : <Navigate to={'/login'}/>}
    </>
  )
}

export default PrivatePages