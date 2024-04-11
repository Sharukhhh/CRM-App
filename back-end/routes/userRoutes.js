import express from 'express';
import { loginUser, userSignup } from '../controllers/user-auth/authController.js';
import { addContact, deleteContact, editContact, fetchContacts, fetchUsers, getDashobardData, getSingleContact, updateContactSettings } from '../controllers/user-management/userDatacontroller.js';
const router = express.Router();


router.post('/signup' , userSignup);

router.post('/login' , loginUser);

router.post('/add-contact', addContact);

router.get('/contacts' , fetchContacts);

router.get('/users' , fetchUsers);

router.get('/dashboard' , getDashobardData);

router.patch('/assign' , updateContactSettings);

router.delete('/delete-contact/:contactId' , deleteContact);

router.put('/edit-contact/:contactId' , editContact);

router.get('/single' , getSingleContact);


export default router;