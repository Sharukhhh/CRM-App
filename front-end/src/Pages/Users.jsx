import React, { useEffect, useState } from 'react'
import Sidebaar from '../components/sidebar/Sidebaar'
import { useToggle } from '../hooks/useToggle'
import TableComponent from '../components/tables/TableComponent'
import { getUsers } from '../api/calls'

const Users = () => {

    const [users , setUsers] = useState([]);
    const {isOpen , toggleSidebar} = useToggle()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            if(response.data.message){
                setUsers(response.data.users);
            }
        }
        fetchUsers();
    }, []);


  return (
    <>
        <div className='flex'>
            <Sidebaar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            />

            <div className={`flex-1 p-6 ms-4  ${isOpen ? 'pl-72' : 'pl-10'}`}>
                <TableComponent
                datas={users}
                isContact={false}
                />
            </div>
        </div>
    </>
  )
}

export default Users