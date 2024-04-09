import React, { useEffect } from 'react';
import {Link , useNavigate} from 'react-router-dom'
import { useDispatch , useSelector } from "react-redux";
import Input from '../fields/Input';
import { useForm } from '../../hooks/useFormHook';
import { login, register } from '../../api/calls';
import {toast} from 'react-hot-toast'
import { saveData } from '../../redux/userSlice';


const Authform = ({isLogin}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.user_crm.userData);


    useEffect(() => {
        if(loggedUser) {
            navigate('/dashboard');
        }
    },[loggedUser]);

    const {
        name , email , password , 
        handleNameChange , handleEmailChange , handlePasswordChange
    } = useForm();

    const formSubmit = async (e) => {
        e.preventDefault();

        if(isLogin) {
            if(!email || !password) {
                return;
            }

            const data = {
                email: email, password: password
            }
            const response = await login(data);
            if(response.data.message) {
                dispatch(saveData(response.data.user));
                toast.success(response.data.message);
                navigate('/dashboard');
            }

        } else {
            if(!name || !email || !password) {
                return;
            }

            const data = {
                name: name , email: email, password: password
            }
            const response = await register(data);

            if(response.data.message) {
                toast.success(response.data.message);
                navigate('/login');
            }

        }
    }
  return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    CRM App
                </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formSubmit} >
                    {isLogin ? (
                        <div className="rounded-md shadow-sm space-y-5">
                            <Input
                            name={'email'}
                            type={'email'}
                            placeholder={'Email address'}
                            value={email}
                            onChange={handleEmailChange}
                            />
                            <Input
                            name={'password'}
                            type={'password'}
                            placeholder={'Password'}
                            value={password}
                            onChange={handlePasswordChange}
                            />
                        </div>
                    ) : (
                        <div className="rounded-md shadow-sm space-y-5">
                            <Input
                            name={'name'}
                            type={'text'}
                            placeholder={'User Name'}
                            value={name}
                            onChange={handleNameChange}
                            />
                            <Input
                            name={'email'}
                            type={'email'}
                            placeholder={'Email address'}
                            value={email}
                            onChange={handleEmailChange}
                            />
                            <Input
                            name={'password'}
                            type={'password'}
                            placeholder={'Password'}
                            value={password}
                            onChange={handlePasswordChange}
                            />
                        </div>
                    )}


                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                        >
                            {
                                !isLogin ? (
                                    <Link to={'/login'}>
                                        Existing User? Login
                                    </Link>
                                ) : (
                                    <Link to={'/'}>
                                        New user? Signup
                                    </Link>
                                )
                            }
                        </button>
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        {isLogin ? 'Sign in' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Authform