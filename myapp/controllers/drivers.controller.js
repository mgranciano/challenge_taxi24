
const logger = require('../middlewares/logger');
const Coordinates = require('../helpers/coords-utils');
const DriverI = require('../schemas/driver');

class Driver {
    
    constructor() {
        this.driver = new DriverI();
        this.coordinates = new  Coordinates();
    }

    async notIntravel(){
        const drivers = await this.driver.find( { intravel: false } ,null,null)
        logger.info(`Driver -> notIntravel -> ${JSON.stringify(drivers)}`);
        return drivers;  
    }

    async get ( req , params = null ) {
        const { limite = 25, desde = 0 } = req.query;     
        const [ count , drivers ] = await this.driver.findDocuments( params, desde, limite );  
        logger.info(`Driver -> get ->${JSON.stringify(drivers)}`); 
        return {  count , drivers };
    }

    async getById ( req ) {

        const { id } = req.params;
        const drivers = [];
    
        const driver = await this.driver.findById( id );

        if( driver ){
            drivers.push(driver);
        }
        logger.info(`Driver -> getById -> ${JSON.stringify(drivers)}`);
        return {  count:drivers.length , drivers };
    }

    async in3kmGet ( req ) {

        const { latitude, longitude } = req.params;
        const notInTravel = await this.notIntravel();
        const located = this.coordinates.find3km(notInTravel,{latitude, longitude} ); 
        logger.info(`Driver -> in3kmGet -> ${JSON.stringify(located)}`);
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
        logger.info(`Driver -> post ->${JSON.stringify(drivers)}`);
        return {  count: drivers.length , drivers };
    }

    async put ( req ) {

        const { id } = req.params;
        const { _id, email, ...resto } = req.body;
        const drivers = [];
    
        drivers.push( await this.driver.findByIdAndUpdate( id, resto ) );
        logger.info(`Driver -> put ->${JSON.stringify(drivers)}`);
        return {  count: drivers.length , drivers };
    }

    async delete ( req ) {

        const { id } = req.params;
        const drivers = [];
    
        drivers.push( await this.driver.findByIdAndDelete( id ) );
        logger.info(`Driver -> delete ->${JSON.stringify(drivers)}`);
        return {  count: drivers.length , drivers };
    }
}

module.exports = Driver;
