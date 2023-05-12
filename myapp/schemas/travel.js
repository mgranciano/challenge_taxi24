const mongoose = require('mongoose');
const { UserSchema } = require('./user');
const { DriverSchema } = require('./driver');
const Schema = mongoose.Schema;

const TravelSchema = Schema({
    user_uid:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    user:{
        type: UserSchema
    },
    driver_uid:{
        type: Schema.Types.ObjectId,
        ref: 'Drivers',
        required: true
    },
    driver:{
        type: DriverSchema
    },
    latitude_origin: {
        type:Number,
        default: 0
    },
    longitude_origin: {
        type:Number,
        default: 0
    },
    latitude_fate: {
        type:Number,
        default: 0
    },
    longitude_fate: {
        type:Number,
        default: 0
    },
    start_date: {
        type:Date,
        default: new Date()
    },
    end_date: {
        type:Date ,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
});


const Travel =  mongoose.model( 'Travel', TravelSchema );

module.exports = { Travel}