const MongoDB = require("../providers/config-mongo");
const Coordinates = require('../helpers/coords-utils');
const Driver = require('../schemas/driver');
const User = require('../schemas/user');
const Travel = require('../schemas/travel');

class Seed{
    constructor(){
        this.mongoDb = new MongoDB();
        this.latitude = process.env.LATITUDE;
        this.longitude = process.env.LONGITUDE;
        this.coordinates = new Coordinates();
        this.driver = new Driver();
        this.user = new User();
        this.travel = new Travel();
    }

    async start(){
        this.mongoDb.clear();
        const center = {
            latitude: +this.latitude,
            longitude: +this.longitude ,
        }; 
        this.result = `Information generated from the coordinates [${ this.latitude },${ this.longitude }]`;
        // ecatepec edo de mex 19.517494,-99.0121012
        const count = 20; //num of coords aleatori
        var radius = 10000; // meters

        try{

            var coords = this.coordinates.getRandom(center, radius, count);  

            for (let i = 0; i < count; i++) {

                this.driver.create(`name${i}`,
                    `lastname${i}`,
                    `email${i}@taxi24.com`,
                    5555555550 + i,
                    coords[i].latitude,
                    coords[i].longitude,
                    );

            }

            for (let i = 0; i < count ; i++) {

                let notInTravel = await this.driver.find( { intravel: false } ,null,null);  
            
                coords = this.coordinates.getRandom(center, radius - 1000, 1);
            
                let userNew = await this.user.create(`user${i}`,
                                                `lastname${i}`,
                                                `email${i}@user.com`,
                                                5555555550 + i);
            
                if ( i < 15) {
                    let driverFind = this.coordinates.findClosest(notInTravel, coords);

                    await this.travel
                        .create( userNew._id, driverFind._id, 
                                coords[0].latitude, coords[0].longitude,
                                coords[0].latitude,coords[0].longitude).then( async (t) =>{
                                    await this.user.findByIdAndUpdate(t.user_uid, { 'intravel': true});
                                    await this.driver.findByIdAndUpdate(t.driver_uid, { 'intravel': true});
                                });
                }
            }


            coords = this.coordinates.getRandom(center, 3000, 5);  

            for (let i = 0; i < 5; i++) {

                this.driver.create(`name3k${i}`,
                    `lastname3k${i}`,
                    `email3k${i}@taxi24.com`,
                    5555555500 + i,
                    coords[i].latitude,
                    coords[i].longitude,
                    );
            }
            
            this.status = 'Process finished successfully';
        }catch(error){
            this.status = `Error in process [${ error}]`;
        }
        return { info: this.result , status: this.status, title : 'Information filling' };
    }
}


module.exports = Seed;