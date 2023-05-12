const { Driver } = require("../schemas/driver");

class DriverI {

    constructor() {
    }

    async create(name, lastname, email, cellphone, latitude, longitude){

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
        return await Driver.findByIdAndUpdate( id, document , {returnDocument: 'after'});
    }

    async findByIdAndDelete( id ){
        return await Driver.findByIdAndDelete( id , {returnDocument: 'after'});
    }
}

module.exports = DriverI;