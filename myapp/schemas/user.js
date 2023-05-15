const { User } = require("../models/user");

class UserI {
  constructor() {}

  async create(name, lastname, email, cellphone) {
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
    return await User.findById(id);
  }

  async findByIdAndUpdate(id, document) {
    document.modified_date = new Date();
    return await User.findByIdAndUpdate(id, document, {
      returnDocument: "after",
    });
  }

  async findByIdAndDelete(id) {
    return await User.findByIdAndDelete(id, { returnDocument: "after" });
  }

  async countDocuments( query = null ) {
    return await User.countDocuments( query );
  }

  async find(query = null , desde = null , limite = null ){
      return await User.find( query )
      .skip( Number( desde ) )
      .limit(Number( limite ));
  }

  async findDocuments (query = null , desde = null , limite = null ){
      return await Promise.all([
          this.countDocuments(query),
          this.find(query, desde, limite)
      ]);
  }
}

module.exports = UserI;
