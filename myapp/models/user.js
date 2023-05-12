const { User } = require("../schemas/user");

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
    return await User.findByIdAndUpdate(id, document, {
      returnDocument: "after",
    });
  }

  async findByIdAndDelete(id) {
    return await User.findByIdAndDelete(id, { returnDocument: "after" });
  }
}

module.exports = UserI;
