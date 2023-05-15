
//const { find3kmCoord } = require('../helpers/coords-utils');
const Coordinates = require('../helpers/coords-utils');
const DriverI = require('../schemas/driver');

class Driver {
    
    constructor() {
        this.driver = new DriverI();
        this.coordinates = new  Coordinates();
    }

    async notIntravel(){
        return await this.driver.find( { intravel: false } ,null,null);   
    }

    async get ( req , params = null ) {
        const { limite = 25, desde = 0 } = req.query;     
        const [ count , drivers ] = await this.driver.findDocuments( params, desde, limite );   
        return {  count , drivers };
    }

    async getById ( req ) {

        const { id } = req.params;
        const drivers = [];
    
        const driver = await this.driver.findById( id );

        if( driver ){
            drivers.push(driver);
        }
    
        return {  count:drivers.length , drivers };
    }

    async in3kmGet ( req ) {

        const { latitude, longitude } = req.params;
        const notInTravel = await this.notIntravel();
        const located = this.coordinates.find3km(notInTravel,{latitude, longitude} ); 
    
        return { count: located.length, located };
    }
 
    async post( req ) {

        const { name, lastname, email, cellphone,latitude, longitude } = req.body;
        const drivers = [];
    
        drivers.push(await this.driver.create(
                                    name,
                                    lastname,
                                    email,
                                    cellphone,
                                    latitude,
                                    longitude
                                ));

        return {  count: drivers.length , drivers };
    }

    async put ( req ) {

        const { id } = req.params;
        const { _id, email, ...resto } = req.body;
        const drivers = [];
    
        drivers.push( await this.driver.findByIdAndUpdate( id, resto ) );

        return {  count: drivers.length , drivers };
    }

    async delete ( req ) {

        const { id } = req.params;
        const drivers = [];
    
        drivers.push( await this.driver.findByIdAndDelete( id ) );

        return {  count: drivers.length , drivers };
    }
}

module.exports = Driver;
