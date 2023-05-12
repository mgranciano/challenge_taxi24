const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    cellphone: {
        type: Number,
        required: [true, 'Cell Phone is required'],
    },
    create_date: {
        type:Date,
        default: new Date()
    },
    modified_date: {
        type:Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: true
    },
    intravel: {
        type: Boolean,
        default: false
    }
});
 

const User =  mongoose.model( 'User', UserSchema );

module.exports = { User , UserSchema}