import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Sidebaar from '../components/sidebar/Sidebaar'
import { useToggle } from '../hooks/useToggle';
import { dashboardData } from '../api/calls';

const Dashboard = () => {

  const loggedUser = useSelector((state) => state.user_crm.userData);
  const { isOpen ,   toggleSidebar } = useToggle();

  const [countData , setCountData] = useState({users: 0 , contacts: 0});

  useEffect(() => {
    const fetchDisplayData = async () => {
      const response = await dashboardData();

      if(response.data.message) {
        setCountData({users : response.data.usersCount , contacts : response.data.contactsCount});
      }
    }

    fetchDisplayData();
  }, []);

  return (
    <>
        <div className='flex'>
          <Sidebaar 
          isOpen={isOpen} 
          toggleSidebar={toggleSidebar}
          />

          {/* Dashboard content */}
          <div className={`flex-1 p-6 ms-4  ${isOpen ? 'pl-72' : 'pl-10'} `}>
            <div className='text-right text-black font-bold text-xl p-4 mb-4'>
              {loggedUser?.name}
            </div>

            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8'>
              <div className='bg-slate-300 rounded-lg shadow-md p-4 text-center font-mono'>
                <div className='text-4xl font-bold'>{countData.users}</div>
                <div className='text-sm'>Users</div>
              </div>
              <div className='bg-slate-300 rounded-lg shadow-md p-4 text-center'>
                <div className='text-4xl font-bold'>{countData.contacts}</div>
                <div className='text-sm'>Contacts</div>
              </div>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default Dashboard