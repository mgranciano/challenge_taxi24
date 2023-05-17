
const MongoDB = require('../providers/config-mongo')
const UserI = require('../schemas/user');
const DriverI = require('../schemas/driver')

var container = {};
container.instance = new MongoDB();

beforeAll(async () => {
    await container.instance.open();
});

afterAll(async () => {
    await container.instance.close();
    delete container.instance;
});

describe("User Test",  () => {
  const user = new UserI
  var id = "";
  it("Create", async () => {
    const userCreate = await user.create(
      `user`,
      `lastname`,
      `email@user.com`,
      5555555550
    );
    id = userCreate._id;
    expect(userCreate.name).toEqual("user");
    expect(userCreate.lastname).toEqual("lastname");
  });

  it("Read", async () => {
    const userRead = await user.findById(id);

    expect(userRead.name).toEqual("user");
    expect(userRead.status).toEqual(true);
  });

  it("Update", async () => {
    const userUpdate = await user.findByIdAndUpdate(id, { name: "newName" });
    expect(userUpdate.name).toEqual("newName");
  });

  it("Delete", async () => {
    await user.findByIdAndDelete(id, { returnDocument: "after" });
    const userRead = await user.findById(id);
    expect(userRead).toEqual(null);
  });
  
});

describe("Driver Test", () => {
  const driver = new DriverI();
  var id = "";

  it("Create", async () => {
    const driverCreate = await driver.create(
      `driver`,
      `lastnameDriver`,
      `emailDriver@user.com`,
      5555555550,
      19.517494,
      -99.0121012
    );
    id = driverCreate._id;
    expect(driverCreate.name).toEqual("driver");
    expect(driverCreate.lastname).toEqual("lastnameDriver");
  });

  it("Read", async () => {
    const driverRead = await driver.findById(id);

    expect(driverRead.name).toEqual("driver");
    expect(driverRead.status).toEqual(true);
  });

  it("Update", async () => {
    const driverUpdate = await driver.findByIdAndUpdate(id, {
      name: "newName",
    });
    expect(driverUpdate.name).toEqual("newName");
  });

  it("Delete", async () => {
    await driver.findByIdAndDelete(id, { returnDocument: "after" });
    const driverRead = await driver.findById(id);
    expect(driverRead).toEqual(null);
  });

});
