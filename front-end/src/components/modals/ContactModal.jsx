import React from 'react'
import {toast} from 'react-hot-toast'
import Input from '../fields/Input'
import { useForm } from '../../hooks/useFormHook'
import { createContact } from '../../api/calls';


const ContactModal = ({isModalOpen , closeModal  , updateUI}) => {

    const {name , email , phone ,
        setName , setEmail , setPhone ,
        handleNameChange , handleEmailChange , handleNumberChange} = useForm();

    const formSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{10}$/;

        if(!phoneRegex.test(phone)) {
            return toast.error('Invalid phone number');
        }

        if(!name || !email || !phone) {
            return toast.error('Fill all the fields');
        }

        const data  = {
            name: name, 
            email: email,
            phone: phone
        }
        const response = await createContact(data);

        if(response.data.message) {
            toast.success(response.data.message);
            updateUI((prev) => !prev);
            setEmail('');
            setName('');
            setPhone('');
            closeModal();
        }
    }

  return (
    <>
    {isModalOpen && (
        <div className='fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50'>
            <div className='inset-0 '>
                <div className='bg-slate-300 p-8 rounded-lg z-50'>
                    <div className='flex justify-between mb-4'>
                        <h2 className='text-xl font-bold me-4'>Create a New Lead</h2>
                        <button onClick={closeModal} className='text-gray-500 hover:text-gray-700'>X</button>
                    </div>

                    <form onSubmit={formSubmit} className="mt-8 space-y-6">
                        <div className='rounded-md shadow-sm space-y-5'>
                            <Input
                            name={'name'}
                            type={'text'}
                            placeholder={'Contact Name'}
                            value={name}
                            onChange={handleNameChange}
                            />
                            <Input
                            name={'email'}
                            type={'email'}
                            placeholder={'Contact Email'}
                            value={email}
                            onChange={handleEmailChange}
                            />
                            <Input
                            name={'phone'}
                            type={'text'}
                            placeholder={'Contact Phone no.'}
                            value={phone}
                            onChange={handleNumberChange}
                            />
                        </div>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
                            Add 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default ContactModal