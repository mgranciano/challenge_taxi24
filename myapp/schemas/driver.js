const { Driver } = require("../models/driver");

class DriverI {
    constructor() {
    }

    async create(name, lastname, email, cellphone, latitude =19.517494, longitude = -99.0121012){

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
        return await Driver.findById(id);
    }

    async findByIdAndUpdate(id, document){
        document.modified_date = new Date();
        return await Driver.findByIdAndUpdate( id, document , {returnDocument: 'after'});
    }

    async findByIdAndDelete( id ){
        return await Driver.findByIdAndDelete( id , {returnDocument: 'after'});
    }

    async countDocuments( query = null ) {
        return await Driver.countDocuments( query );
    }

    async find(query = null , desde = null , limite = null ){
        return await Driver.find( query )
        .skip( Number( desde ) )
        .limit(Number( limite ));
    }

    async findDocuments (query = null , desde = null , limite = null ){
        return await Promise.all([
            this.countDocuments(query),
            this.find(query, desde, limite)
        ]);
    }
}

module.exports = DriverI;