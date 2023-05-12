const { response, request } = require('express');
const { User } = require('../schemas/user');

const userGet = async (req = request, res = response) => {

    const [ total, users ] = await Promise.all([
        User.countDocuments(),
        User.find()
    ]);

    res.json({
        msg: 'get API - users',
        total,
        users
    });

}

const userActiveGet = async (req = request, res = response) => {

    const { limite = 25, desde = 0 } = req.query;
    const query = { status: true };
    const [ total, usuarios ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - users active',
        total,
        usuarios
    }); 
 
}

const userIntravelGet = async (req = request, res = response) => {

    const { limite = 25, desde = 0 } = req.query;
    const query = { intravel: true };
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - users in travel',
        total,
        users
    }); 
 
}

const userGetbyId = async(req = request, res = response) => {

    const { id } = req.params;

    const result = await User.findById( id );

    res.json({
        msg: 'get API - user by ID',
        result
    });
}

const userPost = async (req = request, res = response) => {

    const { name, lastname, email, cellphone } = req.body;

    const userNew = new User({ name, lastname, email, cellphone});

    await userNew.save();

    res.json({
        msg: 'post API - add user',
        userNew
    });
}

const userPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, email, ...resto } = req.body;

    resto.modified_date = new Date();

    const userUpdate = await User.findByIdAndUpdate( id, resto , {returnDocument: 'after'});

    res.json({
        msg: 'put API - update user',
        userUpdate
    });
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete( id );

    res.json({
        msg: 'delete API - delete user',
        delete: userDeleted
    });
}


module.exports = {
    userGet,
    userActiveGet,
    userIntravelGet,
    userGetbyId,
    userPost,
    userPut,
    userDelete,
}