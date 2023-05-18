const { User } = require("../models/user");
const logger = require('../middlewares/logger');
class UserI {
  constructor() {}

  async create(name, lastname, email, cellphone) {
    logger.info(`create -> [${name ? name : 'NOT NAME' }] [${lastname ? lastname : 'NOT LASTNAME' }] [${email ? email : 'NOT EMAIL' }] [${cellphone ? cellphone : 'NOT CELLPHONE' }]`);
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.cellphone = cellphone;

    this.user = new User({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      cellphone: this.cellphone,
    });
    return await this.user.save();
  }

  async findById(id) {
    logger.info(`findById -> [${id ? id : 'NOT ID' }]`);
    return await User.findById(id);
  }

  async findByIdAndUpdate(id, document) {
    document.modified_date = new Date();
    logger.info(`findByIdAndUpdate -> [${id ? id : 'NOT ID' }] [${ document ? require('util').inspect(document) : '' }]`);
    return await User.findByIdAndUpdate(id, document, {
      returnDocument: "after",
    });
  }

  async findByIdAndDelete(id) {
    logger.info(`findByIdAndDelete -> [${id ? id : 'NOT ID' }]`);
    return await User.findByIdAndDelete(id, { returnDocument: "after" });
  }

  async countDocuments( query = null ) {
    logger.info(`countDocuments -> [${query ? require('util').inspect(query) : '' }]`);
    return await User.countDocuments( query );
  }

  async find(query = null , desde = null , limite = null ){
    logger.info(`find -> [${query ? require('util').inspect(query) : '' }] [${desde ? desde : '' }] [${limite ? limite : '' }]`);
      return await User.find( query )
      .skip( Number( desde ) )
      .limit(Number( limite ));
  }

  async findDocuments (query = null , desde = null , limite = null ){
    logger.info(`findDocuments -> [${query ? require('util').inspect(query) : '' }] [${desde ? desde : '' }] [${limite ? limite : '' }]`);
      return await Promise.all([
          this.countDocuments(query),
          this.find(query, desde, limite)
      ]);
  }
}

module.exports = UserI;
