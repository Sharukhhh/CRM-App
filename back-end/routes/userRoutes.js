import express from 'express';
import { loginUser, userSignup } from '../controllers/user-auth/authController.js';
import { addContact, fetchContacts, fetchUsers, getDashobardData, updateContactSettings } from '../controllers/user-management/userDatacontroller.js';
const router = express.Router();


router.post('/signup' , userSignup);

router.post('/login' , loginUser);

router.post('/add-contact', addContact);

router.get('/contacts' , fetchContacts);

router.get('/users' , fetchUsers);

router.get('/dashboard' , getDashobardData);

router.patch('/assign' , updateContactSettings);


export default router;