const { response, request } = require('express');
const { Driver } = require('../schemas/driver');
const { find3kmCoord } = require('../helpers/coords-utils');

const driverGet = async (req = request, res = response) => {

    const { limite = 25, desde = 0 } = req.query;

    const [ total, drivers ] = await Promise.all([
        Driver.countDocuments(),
        Driver.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - drivers',
        total,
        drivers
    });

}

const driverActiveGet = async (req = request, res = response) => {

    const { limite = 25, desde = 0 } = req.query;
    const query = { status: true };
    const [ total, drivers ] = await Promise.all([
        Driver.countDocuments(query),
        Driver.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - driver active',
        total,
        drivers
    }); 
 
}

const driverIntravelGet = async (req = request, res = response) => {

    const { limite = 25, desde = 0 } = req.query;
    const query = { intravel: true };
    const [ total, drivers ] = await Promise.all([
        Driver.countDocuments(query),
        Driver.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - driver in travel',
        total,
        drivers
    }); 
 
}

const driverIn3kmGet = async (req = request, res = response) => {

    const { latitude, longitude } = req.params;

    const notInTravel = await driverNotIntravel();

    const located = find3kmCoord(notInTravel,{latitude, longitude} );

    res.json({
        msg: 'get API - driver in 3 km travel',
        latitude,
        longitude,
        total: located.length,
        located
    }); 
 
}

const driverNotIntravelGet = async (req = request, res = response) => {

    const { limite = 25, desde = 0 } = req.query;
    const query = { intravel: false };
    const [ total, drivers ] = await Promise.all([
        Driver.countDocuments(query),
        Driver.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - driver not in travel',
        total,
        drivers
    }); 
 
}

const driverNotIntravel = async () => {

    const query = { intravel: false };
    const [ drivers ] = await Promise.all([
        Driver.find(query)
    ]);

    return drivers
 
}



const driverGetbyId = async(req = request, res = response) => {

    const { id } = req.params;

    const result = await Driver.findById( id );

    res.json({
        msg: 'get API - driver by ID',
        result
    });
}

const driverPost = async (req = request, res = response) => {

    const { name, lastname, email, cellphone } = req.body;

    const driverNew = new Driver({ name, lastname, email, cellphone });

    await driverNew.save();

    res.json({
        msg: 'post API - add driver',
        driverNew
    });
}

const driverPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, email, ...resto } = req.body;

    resto.modified_date = new Date();
    
    const driverUpdate = await Driver.findByIdAndUpdate( id, resto ,{returnDocument: 'after'});

    res.json({
        msg: 'put API - update driver',
        driverUpdate
    });
}

const driverDelete = async (req, res = response) => {
    const { id } = req.params;

    const driverDeleted = await Driver.findByIdAndDelete( id );

    res.json({
        msg: 'delete API - delete driver',
        delete: driverDeleted
    });
}

module.exports = {
    driverGet,
    driverActiveGet,
    driverIntravelGet,
    driverNotIntravelGet,
    driverIn3kmGet,
    driverNotIntravel,
    driverGetbyId,
    driverPost,
    driverPut,
    driverDelete
}