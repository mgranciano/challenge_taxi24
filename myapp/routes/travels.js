const { Router } = require("express");
const { check } = require("express-validator");
const { existUserId } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate");

const Travel = require("../controllers/travels.controller");

const router = Router();
const travel = new Travel();

router.get("/allactivetravels", async (req, res, next) => {
  res.json({
    result: await travel.Get(req, { status: true })
  });
});

router.get(
  "/:id",
  [check("id", "ID not valid").isMongoId(), validateFields],
  async (req, res, next) => {
    res.json({
      result: await travel.GetById(req)
    });
  });

router.get(
  "/closest/:id/:latitude/:longitude",
  [
    check("id", "ID not valid").isMongoId(),
    check("latitude", "ID not valid").isNumeric(),
    check("longitude", "ID not valid").isNumeric(),
    validateFields,
  ],
  async (req, res, next) => {
    res.json({
      result: await travel.closestTravel(req)
    });
  });

router.post(
  "/starttravel",
  [
    check("latitude", "Latitude is required").not().isEmpty(),
    check("longitude", "Longitude is required").not().isEmpty(),
    check("id", "ID User is required").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  async (req, res, next) => {
    res.json({
      result: await travel(req)
    });
  });

router.put(
  "/finishtravel/:id",
  [
    check("latitude", "Latitude is required").not().isEmpty(),
    check("longitude", "Longitude is required").not().isEmpty(),
    check("id", "ID not valid").isMongoId(),
    validateFields,
  ],
  async (req, res, next) => {
    res.json({
      result: await travel.finishTravel(req ) 
    });
  });
  
module.exports = router;
