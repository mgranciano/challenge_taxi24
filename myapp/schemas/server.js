const cors = require('cors');
const os = require('os');

const express = require('express');

const httpContext = require('express-http-context');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const MongoDB = require('../providers/config-mongo');

const logger = require('../middlewares/logger');
const { interceptor } = require('../middlewares/interceptor');
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
        //start swagger
        this.swagger();
        //this.connectDB();
        this.mongoDb = new MongoDB();
    }

    async connectDB(){
      await this.mongoDb.open();
    }

    middlewares() {

        // view engine setup
        this.app.set('views','views');
        this.app.set('view engine', 'pug');

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use(httpContext.middleware);

        // Run the context for each request. Assign a unique identifier to each request
        this.app.use( interceptor);

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
              openapi: '3.0.0',
              info: {
                title: 'Taxi24 API with Swagger',
                version: '0.1.0',
                description:
                  'This is a simple API application',
                contact: {
                  name: 'Moisés Granciano Rosales',
                  url: 'https://www.linkedin.com/in/moises-granciano-2840b6197/',
                  email: 'mgranciano@baufest.com',
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
                logger.info(`Start server in [ ${this.hostname}:${this.port} ] or [ localhost: ${ this.port } ]`);
            });
        }).catch( (error) =>{
            logger.error(error);
        });
    }

    getServer() {
      return this.app;
    }


}

module.exports = Server;
