import React, { useState , useEffect } from 'react'
import { assigningUser, deleteContact, getUsers } from '../../api/calls';
import {toast} from 'react-hot-toast'


const TableComponent = ({isContact , datas , setUpdateUI , toggleModal}) => {

    const [users , setUsers] = useState([]);
    const [selectedUserId , setSelectedUserId] = useState({});

    useEffect(() => {
        const fetchUsers = async() => {
            const response = await getUsers();
            if(response.data.message) {
                setUsers(response.data.users);
            }
        }

        fetchUsers();
    } , []);

    const handleSelectedUserId = (e , contactId) => {
        setSelectedUserId({...selectedUserId , [contactId]: e.target.value});
    }

    const handleStatusAndAssingnUpdate = async (contactId) => {
        if(selectedUserId[contactId] === '' ) {
            return toast.error('Please select an user first!');
        }
        const data = {
            contactId: contactId, userId: selectedUserId[contactId]
        }

        const response = await assigningUser(data);
        if(response.data.message) {
            toast.success(response.data.message);
            setSelectedUserId({})
            setUpdateUI((prev) => !prev);
        }
    }

    const deletetheContact = async (contactId) => {

        const response  = await deleteContact(contactId);
        if(response.data.message) {
            toast.success(response.data.message);
            setUpdateUI((prev) => !prev);
        }
    }

    // const editTheContact = (contactId) => {
    //     toggleModal(contactId);
    // }


  return (
    <>
        <div className='overflow-x-auto'>
            <div className='max-w-screen-md mx-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase'>
                        <tr>
                            <th className='px-6 py-3 tracking-wider'>Sl No.</th>
                            <th className='px-6 py-3 tracking-wider'>Added Date</th>
                            <th className='px-6 py-3 tracking-wider'>Name</th>
                            <th className='px-6 py-3 tracking-wider'>Email</th>
                            {isContact && (
                                <>
                                    <th className='px-6 py-3 tracking-wider'>Phone no.</th>
                                    <th className='px-6 py-3 tracking-wider'>Tags</th>
                                    <th className='px-6 py-3 tracking-wider'>Assigned</th>
                                    <th className='px-6 py-3 tracking-wider'>Actions</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    {datas?.length > 0 ? (
                        datas?.map((data , index) => (
                            <tbody key={data?._id} className='bg-white divide-y divide-gray-200'>
                                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{new Date(data?.createdAt).toLocaleDateString()}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{data?.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{data?.email}</td>
                                {isContact && (
                                    <>
                                        <td className='px-6 py-4 whitespace-nowrap'>{data?.phone}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <button className='px-2 py-1 text-white bg-green-500 font-semibold'>
                                                {data?.tag}
                                            </button>
                                            <p className='mt-2 text-sm'>to: <span className='font-serif text-red-400'>{data?.assignedTo}</span></p>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <select 
                                            value={selectedUserId}
                                            onChange={(e) => handleSelectedUserId(e , data?._id)}
                                            className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' name="" >
                                                <option value="Assign to" >Assign to</option>
                                                {users?.map((user) => (
                                                    <option key={user?._id} value={user?._id}>{user?.name}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => handleStatusAndAssingnUpdate(data?._id)} className='px-2 mt-4 text-sm text-white bg-blue-500 font-semibold rounded'>
                                                Update
                                            </button>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {/* <button onClick={() => editTheContact(data?._id)}
                                            className='px-2 py-1 text-white bg-orange-500 font-semibold rounded mr-2'>
                                                Edit
                                            </button> */}
                                            <button onClick={() => deletetheContact(data?._id)}
                                            className='px-2 py-1 text-white bg-red-500 font-semibold rounded'>
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tbody>
                        ))
                    ):(
                        <tbody>
                            <td rowSpan={5} className='px-6 py-4 whitespace-nowrap text-center'>no data available</td>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    </>
  )
}

export default TableComponent