
require('dotenv').config();
const Server = require('./schemas/server');

new Server().listen();

