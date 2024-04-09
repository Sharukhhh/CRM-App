import mongoose from 'mongoose';



const contactSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },

    

}, {timestamps: true});


const contactModel = mongoose.model('contacts' , contactSchema);


export default contactModel;