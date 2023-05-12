const express = require("express");
const router = express.Router();

const { driverNotIntravel } = require("../controllers/drivers");
const { Travel } = require("../schemas/travel");
const { User } = require("../schemas/user");
const { Driver } = require("../schemas/driver");
const {
  findClosestCoord,
  getRandomCoordinates,
} = require("../helpers/coords-utils");

router.get("/", async (req, res, next) => {
  const center = {
    latitude: +process.env.LATITUDE,
    longitude: +process.env.LONGITUDE,
  }; // ecatepec edo de mex 19.517494,-99.0121012
  const count = 20; //num of coords aleatori
  var radius = 10000; // meters

  var coords = getRandomCoordinates(center, radius, count);

  for (i = 0; i < coords.length; i++) {
    let driverNew = new Driver({
      name: `name${i}`,
      lastname: `lastname${i}`,
      email: `email${i}@taxi24.com`,
      cellphone: 5555555550 + i,
      latitude: coords[i].latitude,
      longitude: coords[i].longitude,
    });
    await driverNew.save();
  }

  for (i = 0; i < count - 5; i++) {
    const notInTravel = await driverNotIntravel();

    coords = getRandomCoordinates(center, radius - 1000, 1);

    let userNew = new User({
      name: `user${i}`,
      lastname: `lastname${i}`,
      email: `email${i}@user.com`,
      cellphone: 5555555550 + i,
      intravel: true,
    });
    await userNew.save();

    let driverFind = findClosestCoord(notInTravel, coords);
    let travelNew = new Travel({
      user_uid: userNew._id,
      driver_uid: driverFind._id,
      latitude_origin: coords[0].latitude,
      longitude_origin: coords[0].longitude,
      latitude_fate: coords[0].latitude,
      longitude_fate: coords[0].longitude,
    });

    await travelNew.save();

    driverFind.intravel = true;
    await Driver.findByIdAndUpdate(driverFind._id, driverFind);
  }

  coords = getRandomCoordinates(center, 3000, 5);

  for (i = 0; i < coords.length; i++) {
    let driverNew = new Driver({
      name: `name3k${i}`,
      lastname: `lastname3k${i}`,
      email: `email${i}@taxi24.com`,
      cellphone: 5555555550 + i,
      latitude: coords[i].latitude,
      longitude: coords[i].longitude,
    });
    await driverNew.save();
  }

  res.render("seed", { title: "Generación de información" });
});

module.exports = router;
