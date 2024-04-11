import { axiosInstance } from "./axios";
import {toast} from 'react-hot-toast'


export const register = async (data) => {
    try {
        const response = await axiosInstance.post('/signup' , data);

        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }
        
    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}


export const login = async (data) => {
    try {
        const response = await axiosInstance.post('/login' , data);

        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }
        
    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}

export const createContact = async (data) => {
    try {
        const response = await axiosInstance.post('/add-contact' , data);

        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }

    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}


export const getContacts = async () => {
    try {
        const response = await axiosInstance.get('/contacts');
        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }

    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}


export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }

    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}

export const dashboardData = async () => {
    try {
        const response = await axiosInstance.get('/dashboard');

        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }

    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}


export const assigningUser = async (data) => {
    try {
        
        const response = await axiosInstance.patch(`/assign` , data);
        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }

    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}


export const editcontact = async (contactId , data) => {
    try {
        
        const response = await axiosInstance.put(`/edit-contact/${contactId}` , data);
        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }
    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}

export const deleteContact = async (contactId) => {
    try {
        
        const response = await axiosInstance.delete(`/delete-contact/${contactId}` );
        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }
    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}


export const getSingle = async (contactId) => {
    try {
        
        const response = await axiosInstance.get(`/single/${contactId}` );
        if(response.data.message) {
            return response;
        }

        if(response.data.error) {
            return toast.error(response.data.error);
        }
    } catch (error) {
        if(error.response.data.error || error.message || error) {
            return toast.error(error.response.data.error || error.message || 'Server Error');
        }
    }
}