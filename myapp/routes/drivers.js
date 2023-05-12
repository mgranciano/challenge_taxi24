const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate");
const { existDriverId, existEmailDriver } = require("../helpers/db-validators");
const {
  driverGet,
  driverPost,
  driverPut,
  driverActiveGet,
  driverIntravelGet,
  driverGetbyId,
  driverDelete,
  driverNotIntravelGet,
  driverIn3kmGet,
} = require("../controllers/drivers");

const router = Router();

router.get("/", driverGet);

router.get("/active", driverActiveGet);

router.get("/intravel", driverIntravelGet);

router.get("/notintravel", driverNotIntravelGet);

router.get(
  "/:id",
  [check("id", "ID not valid").isMongoId(), validateFields],
  driverGetbyId
);

router.get(
  "/closest/:latitude/:longitude",
  [
    check("latitude", "ID not valid").isNumeric(),
    check("longitude", "ID not valid").isNumeric(),
    validateFields,
  ],
  driverIn3kmGet
);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email").custom(existEmailDriver),
    check("cellphone", "Cell Phone is required").not().isEmpty(),
    validateFields,
  ],
  driverPost
);

router.put(
  "/:id",
  [
    check("id", "ID not valid").isMongoId(),
    check("id").custom(existDriverId),
    validateFields,
  ],
  driverPut
);

router.delete(
  "/:id",
  [
    check("id", "ID not valid").isMongoId(),
    check("id").custom(existDriverId),
    validateFields,
  ],
  driverDelete
);

module.exports = router;
