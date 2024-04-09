import React from 'react'
import { Link } from "react-router-dom";

const ContentTitle = ({title , to}) => {
  return (
    <>
    <Link to={to}>
        <p className='text-gray-300 hover:text-gray-200 hover:scale-x-90 cursor-pointer'>{title}</p>
        <hr className="my-2 border-gray-600" />
    </Link>
    </>
  )
}

export default ContentTitle