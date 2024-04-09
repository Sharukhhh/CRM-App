import {useState} from 'react';



export const useForm = () => {

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [phone , setPhone] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleNumberChange = (e) => {
        setPhone(e.target.value);
    }

    return  {
        name , email , password, phone,
        setName , setEmail , setPhone,
        handleNameChange , handleEmailChange , handlePasswordChange, handleNumberChange
    }
}