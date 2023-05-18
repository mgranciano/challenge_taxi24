const { validationResult } = require('express-validator');
const logger = require('./logger');


const validateFields = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        logger.error(`${ req.method } ${req.originalUrl} 400 ${ JSON.stringify(req.query) } ${ JSON.stringify(errors)}`);
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateFields
}
