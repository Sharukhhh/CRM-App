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