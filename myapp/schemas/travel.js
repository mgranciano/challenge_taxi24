const { Travel } = require("../models/travel");
const DriverI = require("./driver");
const UserI = require("./user");

class TravelI {
    constructor() {
        this.user = new UserI();
        this.driver = new DriverI();
    }

    async create(user_uid, driver_uid, latitude_origin =19.517494, longitude_origin = -99.0121012,latitude_fate =19.517494, longitude_fate = -99.0121012){

        this.user_uid = user_uid;
        this.driver_uid = driver_uid;
        this.latitude_origin  = latitude_origin ;
        this.longitude_origin  = longitude_origin ;
        this.latitude_fate  = latitude_fate ;
        this.longitude_fate  = longitude_fate ;

        this.travel = new Travel({ user_uid : this.user_uid, driver_uid: this.driver_uid, 
            latitude_origin:this.latitude_origin, longitude_origin:this.longitude_origin, 
            latitude_fate:this.latitude_fate, longitude_fate: this.longitude_fate});
        return  await this.travel.save();
    }

    async findById(id){
        const travel =  await Travel.findById(id)
        
        if (travel){
            travel.user = await this.user.findById(travel.user_uid);
            travel.driver = await this.driver.findById(travel.driver_uid);
        }

        return travel;
    }

    async findByIdAndUpdate(id, document){
        document.modified_date = new Date();
        return await Travel.findByIdAndUpdate( id, document , {returnDocument: 'after'});
    }

    async countDocuments( query = null ) {
        return await Travel.countDocuments( query );
      }
    
    async find(query = null , desde = null , limite = null ){
        const travels =  await Travel.find( query )
        .skip( Number( desde ) )
        .limit(Number( limite ));

        for(let i=0; i<travels.length ; i++){
            travels[i].user = await this.user.findById(travels[i].user_uid);
            travels[i].driver = await this.driver.findById(travels[i].driver_uid);
        }

        return travels;
    }

    async findDocuments (query = null , desde = null , limite = null ){
        return await Promise.all([
            this.countDocuments(query),
            this.find(query, desde, limite)
        ]);
    }
}

module.exports = TravelI;