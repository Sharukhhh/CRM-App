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

    assignedToID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    assignedTo: {
        type: String
    },

    tag: {
        type: String,
        default: 'New Lead',
        enum: ['New Lead' , 'Assigned' , 'Contacted']
    },

    status: {
        type: String,
    }

}, {timestamps: true});


const contactModel = mongoose.model('contacts' , contactSchema);


export default contactModel;