
const logger = require('../middlewares/logger');
const UserI = require('../schemas/user');

class User {
    
    constructor() {
        this.user = new UserI();
    }

    async get ( req , params = null ) {
        const { limite = 25, desde = 0 } = req.query;     
        const [ count , users ] = await this.user.findDocuments( params, desde, limite );   
        logger.info(`User -> get ->${JSON.stringify(users)}`);
        return {  count , users };
    }

    async getById ( req ) {
        const { id } = req.params;
        const users = [];

        const user = await this.user.findById( id );

        if(user){
            users.push( user );
        }
        logger.info(`User -> getById -> ${JSON.stringify(users)}`);
        return {  count: users.length , users };
    }

    async post( req ) {
        logger.info(`User -> post`);
        const { name, lastname, email, cellphone } = req.body;
        const users = [];
    
        users.push(await this.user.create(
                                    name,
                                    lastname,
                                    email,
                                    cellphone
                                ));
        logger.info(`User -> post ->${JSON.stringify(users)}`);
        return {  count: users.length , users };
    }

    async put ( req ) {
        const { id } = req.params;
        const { _id, email, ...resto } = req.body;
        const users = [];
    
        users.push( await this.user.findByIdAndUpdate( id, resto ) );
        logger.info(`User -> put ->${JSON.stringify(users)}`);
        return {  count :users.length , users };
    }

    async delete ( req ) {
        const { id } = req.params;
        const users = [];
    
        users.push( await this.user.findByIdAndDelete( id ) );
        logger.info(`User -> delete -> ${JSON.stringify(users)}`);
        return {  count: users.length, users };
    }

}


module.exports = User;