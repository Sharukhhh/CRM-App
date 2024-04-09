import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch  } from "react-redux";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import ContentTitle from '../text/ContentTitle';
import { logout } from '../../redux/userSlice';
import { Link } from "react-router-dom";

const Sidebaar = ({toggleSidebar , isOpen}) => {

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

  return (
    <>
        {isOpen ? (
            <div className={`fixed inset-y-0 left-0 ${
                isOpen ? 'w-72' : 'w-10'
            } bg-gray-800 text-white p-4 z-10 transition-all duration-300 ease-in-out`}>
                <div className='flex justify-between items-center'>
                    <Link to={'/dashboard'}>
                        <h2 className='text-xl font-bold'>CRM App</h2>
                    </Link>
                    <p className='cursor-pointer text-xl font-semibold text-gray-200' onClick={toggleSidebar}>
                        X
                    </p>
                </div>
        
                <hr className='my-2 border-gray-600 mb-6'/>
                <div className='mb-10'>
                    <ContentTitle title={'Contacts'} to={'/contacts'}/>
                    <ContentTitle title={'Users'} to={'/users'}/>
                </div>
                <button onClick={handleLogout}
                className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-full'
                >
                    Logout
                </button>
            </div>
        ) : (
            <div className='fixed inset-y-0 left-0 w-10 bg-gray-800 text-white'>
                <button onClick={toggleSidebar} className=' mx-2 mt-4'>
                    <IoMdArrowDropleftCircle size={24}/>
                </button>
            </div>
        )}
    </>
  )
}

export default Sidebaar