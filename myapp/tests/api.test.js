const {
  dbConnection,
  dbConnectionClose,
} = require("../providers/config-mongo");
const DriverI = require("../models/driver");
const UserI = require("../models/user");

beforeAll(async () => {
  await dbConnection();
});

afterAll(async () => {
  await dbConnectionClose();
});

describe("User Test", () => {
  const user = new UserI();
  var id = "";

  test("Create", async () => {
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

  test("Read", async () => {
    const userRead = await user.findById(id);

    expect(userRead.name).toEqual("user");
    expect(userRead.status).toEqual(true);
  });

  test("Update", async () => {
    const userUpdate = await user.findByIdAndUpdate(id, { name: "newName" });
    expect(userUpdate.name).toEqual("newName");
  });

  test("Delete", async () => {
    await user.findByIdAndDelete(id, { returnDocument: "after" });
    const userRead = await user.findById(id);
    expect(userRead).toEqual(null);
  });
});

describe("Driver Test", () => {
  const driver = new DriverI();
  var id = "";

  test("Create", async () => {
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

  test("Read", async () => {
    const driverRead = await driver.findById(id);

    expect(driverRead.name).toEqual("driver");
    expect(driverRead.status).toEqual(true);
  });

  test("Update", async () => {
    const driverUpdate = await driver.findByIdAndUpdate(id, {
      name: "newName",
    });
    expect(driverUpdate.name).toEqual("newName");
  });

  test("Delete", async () => {
    await driver.findByIdAndDelete(id, { returnDocument: "after" });
    const driverRead = await driver.findById(id);
    expect(driverRead).toEqual(null);
  });
});
