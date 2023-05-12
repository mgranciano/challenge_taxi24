const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            dbName: 'taxi24_db'
        });

        console.log(`Connect to DataBase [${process.env.DB_HOST}][OK]`);

    } catch (error) {
        throw new Error(`Connect to DataBase [${error}]`);
    }
 
}

const dbClear = async() => {
    try {
        await mongoose.connection.db.dropDatabase();
    } catch (error) {
        throw new Error(`Error in Clear DataBase [${error}]`);
    } 
}

const dbConnectionClose = async() => {

    try {

        await mongoose.connection.close();
    
        console.log('Close to DataBase [OK]');

    } catch (error) {
        throw new Error(`Connect to DataBase [${error.codeName}]`);
    }
 
}



module.exports = {
    dbClear,
    dbConnection,
    dbConnectionClose
}