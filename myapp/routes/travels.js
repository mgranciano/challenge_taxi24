const { Router } = require("express");
const { check } = require("express-validator");
const {
  travelGet,
  finishTravel,
  travelGetbyId,
  startTravel,
  closestTravel,
} = require("../controllers/travels");
const { existUserId } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate");

const router = Router();

router.get("/allactivetravels", travelGet);

router.get(
  "/:id",
  [check("id", "ID not valid").isMongoId(), validateFields],
  travelGetbyId
);

router.get(
  "/closest/:id/:latitude/:longitude",
  [
    check("id", "ID not valid").isMongoId(),
    check("latitude", "ID not valid").isNumeric(),
    check("longitude", "ID not valid").isNumeric(),
    validateFields,
  ],
  closestTravel
);

router.post(
  "/starttravel",
  [
    check("latitude", "Latitude is required").not().isEmpty(),
    check("longitude", "Longitude is required").not().isEmpty(),
    check("id", "ID User is required").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  startTravel
);

router.put(
  "/finishtravel/:id",
  [
    check("latitude", "Latitude is required").not().isEmpty(),
    check("longitude", "Longitude is required").not().isEmpty(),
    check("id", "ID not valid").isMongoId(),
    validateFields,
  ],
  finishTravel
);

module.exports = router;
