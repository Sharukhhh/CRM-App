import { Mongoose } from 'mongoose';
import ContactModel from '../../models/contactModel.js'
import userModel from '../../models/userModel.js';


/*
    path: '/add-contact',
    METHOD: post
*/
export const addContact = async (req, res) => {
    try {
        const {name , email, phone} = req.body;

        const isExistingEmail = await ContactModel.findOne({email : email});

        if(isExistingEmail) {
            return res.status(409).json({error: 'User already Exists'});
        }

        const isExistingPhone = await ContactModel.findOne({phone: phone});

        if(isExistingPhone) {
            return res.status(409).json({error: 'User already Exists'});
        }

        const contact = new ContactModel ({
            name, 
            email,
            phone
        });

        await contact.save();
        return res.status(201).json({message: 'Contact created'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'});
    }
}



/*
    path: '/contacts',
    METHOD: get
*/
export const fetchContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find().sort({_id : -1});

        if(!contacts) {
            return res.status(404).json({error: 'No contacts'});
        }

        return res.status(200).json({message: 'success', contacts});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'});
    }
}


/*
    path: '/users',
    METHOD: get
*/
export const fetchUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        if(!users) {
            return res.status(404).json({error: 'No users '});
        }

        return res.status(200).json({message: 'success', users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'});
    }
}


/*
    path: '/dashboard',
    METHOD: get
*/
export const getDashobardData = async (req, res) => {
    try {
        
        const contactsCount = await ContactModel.countDocuments();
        const usersCount = await userModel.countDocuments();

        return res.status(200).json({message: 'success', contactsCount , usersCount});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'});
    }
}



/*
path: '/assign',
METHOD: patch
*/
export const updateContactSettings = async (req, res) => {
    try {
        
        const {userId , contactId} = req.body;
        const user = await userModel.findById(userId);

        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        let contact;

        contact = await ContactModel.findById(contactId);

        if(!contact) {
            return res.status(404).json({error: 'Contact not found 1'});
        
        } else if(contact.assignedToID?.toString() === userId.toString()) {
            return res.status(409).json({error: 'already assigned'});

        } else {
            contact = await ContactModel.findByIdAndUpdate(contactId , {
                tag: 'Assigned' , 
                assignedToID: user._id,
                assignedTo: user.name
    
            } , {new: true});
    
            if(!contact) {
                return res.status(404).json({error: 'Contact not found'});
            }
    
            return res.status(200).json({message: `Updated ${contact?.name}!`});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'});
    }
}