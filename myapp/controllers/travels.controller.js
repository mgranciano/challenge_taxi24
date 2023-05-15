

const TravelI = require('../schemas/travel');
const UserI = require('../schemas/user');
const DriverI = require('../schemas/driver');
const Coordinates = require('../helpers/coords-utils');

class Travel {
    
    constructor() {
        this.user = new UserI();
        this.travel = new TravelI();
        this.driver = new DriverI();
        this.coordinates = new Coordinates();
    }

    async Get ( req , params = null ) {
        const { limite = 25, desde = 0 } = req.query;     
        const [ count , drivers ] = await this.travel.findDocuments( params, desde, limite );   
        return {  count , drivers };
    }

    async GetById ( req ) {

        const { id } = req.params;
        const travels = [];

        const travel = await this.travel.findById( id );

        if(!travel){
            return {  count: null, travels: null, error : `User ${ id } not found.` };
        }else{
            travels.push(travel);
        }
        return {  count: travels.length , travels };
    }

    async closestTravel ( req ) {

        const { latitude, longitude, id } = req.params;

        const notInTravel = await this.driver.find( { intravel: false } ,null,null);  

        const driver = this.coordinates.find3Closes(notInTravel, { latitude , longitude });

        return {  count: driver.length, driver };

    }

    async startTravel ( req ) {
        const { latitude, longitude, id } = req.body;
        
        const userForTravel = await this.user.findById ( id );

        if(user || user.intravel){
            return {  count: null, travels: null, error : `User ${ id } not found or user in travel` };
        }

        const notInTravel = await this.driver.driverNotIntravel();
    
        const driverForTravel = this.coordinates.find3Closes (notInTravel, { latitude , longitude });

        if(driverForTravel){
            return {  count: null, travels: null, error : `No drivers found` };
        }

        var travel = await this.travel.create( userForTravel._id, driverForTravel._id, 
            latitude, longitude, 
            latitude, longitude);

        const info = { 'intravel': true };
        travel.user = await this.user.findByIdAndUpdate(userForTravel._id, info );
        travel.driver = await this.driver.findByIdAndUpdate(driverForTravel._id, info);

        const travels = [];
        travels.push(travel);

        return {  count: travel.length, travel };
    }

    async finishTravel ( req ) {
        const { id } = req.params;
        const { latitude, longitude } = req.body;


        var travelInCurse = await this.travel.findById( id );

        if(!travelInCurse){
            return {  count: null, travels: null, error : `Travel ${ id } not found or not in progress` };
        }
        if(!travelInCurse.status){
            return {  count: null, travels: { travelInCurse }, error : `Travel ${ id } not in progress` };
        }

        travelInCurse = await this.travel.findByIdAndUpdate( id, { 'status': false , 
                                                                    'end_date': new Date(), 
                                                                    'latitude_fate': latitude, 
                                                                    'longitude_fate': longitude 
                                                                    });

        travelInCurse.user = this.user.findByIdAndUpdate( travelInCurse.user_uid,{ 'intravel': false } );
        travelInCurse.driver = this.driver.findByIdAndUpdate( travelInCurse.driver_uid, { 'intravel': false,
                                                                                            'latitude': latitude, 
                                                                                            'longitude': longitude } );


        const travels = [];
        travels.push( travelInCurse );
        return {  count: travels.length , travels };

    }

}
 
module.exports = Travel;