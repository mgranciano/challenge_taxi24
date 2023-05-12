const cors = require('cors');
const express = require('express');
const logger = require('morgan');

const os = require("os");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { dbConnection } = require('../providers/config-mongo');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.indexPath = '/';
        this.usersPath = '/api/users';
        this.driversPath = '/api/drivers';
        this.travelsPath = '/api/travels';
        this.seedsPath = '/api/seeds';
        this.hostname = os.hostname();
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        this.swagger();
        //this.connectDB();
    }


    async connectDB(){
        await dbConnection();
    }

    middlewares() {

        // view engine setup
        this.app.set('views','views');
        this.app.set('view engine', 'pug');

        //logger
        this.app.use(logger('dev'));

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.usersPath, require('../routes/users'));
        this.app.use( this.driversPath, require('../routes/drivers'));
        this.app.use( this.travelsPath, require('../routes/travels'))
        this.app.use( this.indexPath, require('../routes/index'));
        this.app.use( this.seedsPath , require('../routes/seeds'));

    }

    swagger(){
        const options = {
            definition: {
              openapi: "3.0.0",
              info: {
                title: "Taxi24 API with Swagger",
                version: "0.1.0",
                description:
                  "This is a simple API application",
                contact: {
                  name: "Moisés Granciano Rosales",
                  url: "https://www.linkedin.com/in/moises-granciano-2840b6197/",
                  email: "mgranciano@baufest.com",
                },
              },
              servers: [
                {
                  url: `http://${this.hostname}:${this.port}/api/`,
                },
              ],
            },
            apis: [`./routes/*.js`],
          };
          
          const specs = swaggerJsdoc(options);

          this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(specs, { explorer: true })
          );
    }

    listen() {
        this.connectDB().then(()=> {
            this.app.listen( this.port, () => {
                console.log(`Start server in [${this.hostname}:${this.port}] or [ localhost:${this.port} ]`);
            });
        }).catch( (error) =>{
            console.log(error);
        });    
        
    }

}

module.exports = Server;
