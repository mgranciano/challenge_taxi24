const { response, request } = require('express');
const { Travel } = require('../schemas/travel');
const { User } = require('../schemas/user');
const { Driver } = require('../schemas/driver');
const { driverNotIntravel } = require('./drivers');
const { findClosestCoord, find3ClosesCoord } = require('../helpers/coords-utils');



const travelGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    const [ total, travels ] = await Promise.all([
        Travel.countDocuments(query),
        Travel.find(query).populate('Users')
                     .skip( Number( desde ) )
                     .limit(Number( limite )) //fixme : populate not found
    ]);


    for(i=0; i<travels.length ; i++){
      travels[i].user = await User.findById(travels[i].user_uid);
      travels[i].driver = await Driver.findById(travels[i].driver_uid);
    }

    res.json({
        msg: 'get API - travel',
        total,
        travels
    });

}

const travelGetbyId = async(req = request, res = response) => {

    const { id } = req.params;

    const travel = await Travel.findById( id );

    travel.user = await User.findById(travel.user_uid);
    travel.driver = await Driver.findById(travel.driver_uid);

    res.json({
        msg: 'get API - info travel',
        travel
    });
}

const finishTravel = async (req = request, res = response) => {

    const { id } = req.params;
    const { latitude, longitude } = req.body;

  
    const travel = await Travel.findByIdAndUpdate( id, {'status': false , 
                                                        'end_date': new Date(), 
                                                        'latitude_fate': latitude, 
                                                        'longitude_fate': longitude 
                                                       } , { returnDocument: 'after' });


    travel.user = await User.findByIdAndUpdate(travel.user_uid, { 'intravel': false, 
                                                                 'modified_date' : new Date() } , 
                                                               { returnDocument: 'after' });

    travel.driver = await Driver.findByIdAndUpdate(travel.driver_uid, { 'intravel': false,
                                                                       'latitude': latitude, 
                                                                       'longitude': longitude , 
                                                                       'modified_date' : new Date()} , 
                                                                     { returnDocument: 'after' });
 
    res.json({
        msg: 'get API - viaje terminado',
        travel,
    });
} 

const startTravel = async (req = request, res = response) => {

    const { latitude, longitude, id } = req.body;


    const user = await User.findById(id);

    if(user.intravel){
        return res.status(400).json({
            msg: `User ${ user.name }, in travel`
        });
    }

    const notInTravel = await driverNotIntravel();
    
    const driver = findClosestCoord (notInTravel, { latitude , longitude });
    
    if(driver){
        return res.status(400).json({
            msg: `No drivers available`
        });
    }
    const travel = new Travel({ user_uid : user._id, driver_uid: driver._id, 
        latitude_origin:latitude, longitude_origin:longitude, 
        latitude_fate:latitude, longitude_fate:longitude });

    await travel.save();

    const info = { 'intravel': true , 'modified_date' : new Date}
    travel.driver = await Driver.findByIdAndUpdate( driver._id, info, { returnDocument: 'after' });
    travel.user = await User.findByIdAndUpdate( id, info , { returnDocument: 'after' })


    res.json({
        msg: 'post API - Iniciar Viaje',
        travel
    });
}

const closestTravel = async (req = request, res = response) => {

    const { latitude, longitude, id } = req.params;

    const notInTravel = await driverNotIntravel();

    const driver = find3ClosesCoord (notInTravel, { latitude , longitude });

    res.json({
        msg: 'post API - 3 closer',
        latitude,
        longitude,
        id,
        driver
    });
}


 
module.exports = {
    travelGet,
    travelGetbyId,
    finishTravel,
    startTravel,
    closestTravel
}  