import React, { useEffect, useState } from 'react'
import Sidebaar from '../components/sidebar/Sidebaar'
import { useToggle } from '../hooks/useToggle'
import TableComponent from '../components/tables/TableComponent'
import ContactModal from '../components/modals/ContactModal'
import { getContacts, getSingle } from '../api/calls'

const Contacts = () => {

    const [updateUI, setUpdateUI] = useState(false);
    const [contacts , setContacts] = useState([]);
    const [contactEditData , setContactEditData] = useState(null);
    const [singleContactId , setSingleContactId] = useState('');
    const [isModalOpen , setIsModalOpen] = useState(false);
    const {isOpen , toggleSidebar} = useToggle()

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const toggleModalFromTable = (contactId) => {
        toggleModal();
        setSingleContactId(contactId);
    }

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await getContacts();
            if(response.data.message){
                setContacts(response.data.contacts);
            }
        }
        fetchContacts();
    }, [updateUI]);

    useEffect(() => {

        const getSingleData = async () => {
            if(singleContactId !== ''){
                const response = await getSingle(singleContactId);
                if(response.data.message) {
                    setContactEditData(response.data.contact);
                }
            }
        }

        getSingleData();

    }, [singleContactId , updateUI])


  return (
    <>
    <div className='flex'>
        <Sidebaar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        />

        {/* Content section */}
        <div className={`flex-1 p-6 ms-4  ${isOpen ? 'pl-72' : 'pl-10'}`}>
            <button onClick={toggleModal} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4'>
                Add Contact
            </button>

            <TableComponent
            datas={contacts}
            isContact={true}
            setUpdateUI={setUpdateUI}
            toggleModal={toggleModalFromTable}
            />

            <ContactModal 
            isModalOpen={isModalOpen} 
            closeModal={toggleModal} 
            updateUI={setUpdateUI}
            editData={contactEditData}
            />
        </div>
    </div>
    </>
  )
}

export default Contacts