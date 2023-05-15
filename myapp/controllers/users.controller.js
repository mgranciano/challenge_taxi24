
const UserI = require('../schemas/user');

class User {
    
    constructor() {
        this.user = new UserI();
    }

    async get ( req , params = null ) {
        const { limite = 25, desde = 0 } = req.query;     
        const [ count , drivers ] = await this.user.findDocuments( params, desde, limite );   
        return {  count , drivers };
    }

    async getById ( req ) {

        const { id } = req.params;
        const users = [];

        const user = await this.user.findById( id );

        console.log(user);

        if(user){
            users.push( user );
        }
        return {  count: users.length , users };
    }

    async post( req ) {

        const { name, lastname, email, cellphone } = req.body;
        const users = [];
    
        users.push(await this.user.create(
                                    name,
                                    lastname,
                                    email,
                                    cellphone
                                ));
        const count = users.length;

        return {  count , users };
    }

    async put ( req ) {

        const { id } = req.params;
        const { _id, email, ...resto } = req.body;
        const users = [];
    
        users.push( await this.user.findByIdAndUpdate( id, resto ) );

        return {  count :users.length , users };
    }

    async delete ( req ) {

        const { id } = req.params;
        const users = [];
    
        users.push( await this.user.findByIdAndDelete( id ) );

        return {  count: users.length, users };
    }

}


module.exports = User;