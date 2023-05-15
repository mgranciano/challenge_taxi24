const express = require("express");
const Seed = require("../controllers/seed.controller");
const router = express.Router();

const seed = new Seed();

router.get("/", async (req, res, next) => {

const result = await seed.start();

  res.render('seed', result);
});

module.exports = router;
