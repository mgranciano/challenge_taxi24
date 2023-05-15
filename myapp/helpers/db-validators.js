
const { Driver } = require('../models/driver');
const { Travel } = require('../models/travel');
const { User } = require('../models/user');

const existUserId = async( id ) => {
    // Verificar si el id existe en la tabla de Users
    const exist = await User.findById(id);
    if( !exist ){
        throw new Error(`ID no exist ${ id }`);
    }
}

const existDriverId = async( id ) => {
    // Verificar si el id existe en la tabla de Drivers
    const exist = await Driver.findById(id);
    if( !exist ){
        throw new Error(`ID no exist ${ id }`);
    }
}

const existTravelId = async( id ) => {
    // Verificar si el id existe en la tabla de Travel
    const exist = await Travel.findById(id);
    if( !exist ){
        throw new Error(`ID no exist ${ id }`);
    }
}

const existEmailUser = async( email = '' ) => {
    // Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if ( existEmail ) {
        throw new Error(`Email: ${ email }, already registered`);
    }
}

const existEmailDriver = async( email = '' ) => {
    // Verificar si el correo existe
    const existEmail = await Driver.findOne({ email });
    if ( existEmail ) {
        throw new Error(`Email: ${ email }, already registered`);
    }
}

module.exports = {
    existUserId,
    existDriverId,
    existTravelId,
    existEmailUser,
    existEmailDriver
}