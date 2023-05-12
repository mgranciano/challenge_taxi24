const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('Connect to DataBase [OK]');

    } catch (error) {
        throw new Error(`Connect to DataBase [${error.codeName}]`);
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
    dbConnection,
    dbConnectionClose
}