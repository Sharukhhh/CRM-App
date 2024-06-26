import { comparePassword, encryptPassword } from '../../helpers/password.js';
import UserModel from '../../models/userModel.js';



/*
    path: '/signup',
    METHOD: post
*/
export const userSignup = async (req, res ) => {
    try {
        const {name , email,  password} = req.body;

        if(!name || !email || !password) {
            return res.json({error: 'Invalid Entries'});
        }

        const isExistingUser = await UserModel.findOne({email : email});

        if(isExistingUser) {
            return res.status(409).json({error: 'User already Exists'});
        }

        const securePassword = await encryptPassword(password);

        const user = new UserModel ({
            name, 
            email,
            password: securePassword
        });

        await user.save();

        return res.status(201).json({message: 'New user created'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server Error'});
    }
}



/*
    path: '/login',
    METHOD: post
*/
export const loginUser = async (req, res) => {
    try {
        const {email , password} = req.body;

        if( !email ||  !password) {
            return res.json({error: 'Invalid Entries'});
        }


        const existingUser = await UserModel.findOne({email : email});

        if(!existingUser) {
            return res.status(404).json({error: 'User not found'});
        }

        const checkPassword = await comparePassword(password , existingUser.password);

        if(!checkPassword) {
            return res.status(404).json({error: 'Password does not match'});
        }

        const user = {
            name: existingUser.name,
            email: existingUser.email,
            userId: existingUser._id
        }
        
        return res.status(200).json({message: 'Login successfull',  user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server Error'});
    }
}