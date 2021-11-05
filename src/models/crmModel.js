import mongoose from 'mongoose';

const { Schema } = mongoose;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: "Enter a first Name"
    },
    lastName: {
        type: String,
        required: "Enter a last Name"
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});