const mongoose = require('mongoose');
const logger = require('../middlewares/logger');

class MongoDB{

    constructor(){
        this.db_user = process.env.DB_USER;
        this.db_pass = process.env.DB_PASS;
        this.db_host = process.env.DB_HOST;
        this.db_port = process.env.DB_PORT;
        this.db_name = process.env.DB_NAME;
    }

    async open(){

        try {

            this.mongoInstance = await mongoose.connect( `mongodb://${ this.db_user }:${ this.db_pass }@${ this.db_host }:${ this.db_port }`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                dbName: this.db_name
            });
    
            logger.info(`Connect to DataBase [ ${ this.db_host} ][ ${ this.db_name } ][OK]`);
    
        } catch (error) {
            throw new Error(`Connect to DataBase [${error}]`);
        }

    }

    async clear(){

        try {
            await  mongoose.connection.db.dropDatabase();
        } catch (error) {
            throw new Error(`Error in Clear DataBase [${error}]`);
        } 

    }

    async close(){

        try {

            await this.mongoInstance.connection.close();
            this.mongoInstance = null;
            logger.info('Close to DataBase [OK]');

        } catch (error) {
            throw new Error(`Connect to DataBase [${error.codeName}]`);
        }
    }
}


module.exports = MongoDB