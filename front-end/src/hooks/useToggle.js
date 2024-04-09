import {useState} from 'react';


export const useToggle = () => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return {
        isOpen , toggleSidebar
    }
}
