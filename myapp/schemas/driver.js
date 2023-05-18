const { Driver } = require("../models/driver");
const logger = require('../middlewares/logger');

class DriverI {
    constructor() {
    }

    async create(name, lastname, email, cellphone, latitude =19.517494, longitude = -99.0121012){
        logger.info(`create -> [${name ? name : 'NOT NAME' }] [${lastname ? lastname : 'NOT LASTNAME' }] [${email ? email : 'NOT EMAIL' }] [${cellphone ? cellphone : 'NOT CELLPHONE' }] [${latitude ? latitude : 'NOT LATITUDE' }] [${longitude ? longitude : 'NOT LONGITUDE' }]`);
        this.name = name;
        this.lastname = lastname;
        this.email =  email;
        this.cellphone = cellphone;
        this.latitude = latitude;
        this.longitude = longitude;

        this.driver = new Driver({ name: this.name, lastname: this.lastname, email: this.email,cellphone:  this.cellphone, latitude: this.latitude, longitude: this.longitude});
        return  await this.driver.save();
    }

    async findById(id){
        logger.info(`findById -> [${id ? id : 'NOT ID' }]`);
        return await Driver.findById(id);
    }

    async findByIdAndUpdate(id, document){
        logger.info(`findByIdAndUpdate -> [${id ? id : 'NOT ID' }] [${ document ? require('util').inspect(document) : '' }]`);
        document.modified_date = new Date();
        return await Driver.findByIdAndUpdate( id, document , {returnDocument: 'after'});
    }

    async findByIdAndDelete( id ){
        logger.info(`findByIdAndDelete -> [${id ? id : 'NOT ID' }]`);
        return await Driver.findByIdAndDelete( id , {returnDocument: 'after'});
    }

    async countDocuments( query = null ) {
        logger.info(`countDocuments -> [${query ? require('util').inspect(query) : '' }]`);
        return await Driver.countDocuments( query );
    }

    async find(query = null , desde = null , limite = null ){
        logger.info(`find -> [${query ? require('util').inspect(query) : '' }] [${desde ? desde : '' }] [${limite ? limite : '' }]`);
        return await Driver.find( query )
        .skip( Number( desde ) )
        .limit(Number( limite ));
    }

    async findDocuments (query = null , desde = null , limite = null ){
        logger.info(`findDocuments -> [${query ? require('util').inspect(query) : '' }] [${desde ? desde : '' }] [${limite ? limite : '' }]`);
        return await Promise.all([
            this.countDocuments(query),
            this.find(query, desde, limite)
        ]);
    }
}

module.exports = DriverI;