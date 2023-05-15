const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate");
const { existUserId, existEmailUser } = require("../helpers/db-validators");

const User = require("../controllers/users.controller");

const router = Router();
const user = new User();

router.get('/', async (req, res, next) => {
  res.json({
    result: await user.get(req)
  });
});

router.get('/active',async (req, res, next) => {
  res.json(
    await user.get(req, { status: true } )
  );
});

router.get('/intravel', async (req, res, next) => {
res.json(
  await user.get(req, { intravel: true } )
);
});

router.get( '/:id', async (req, res, next) => {
  res.json(
    await user.getById(req)
  );
});

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email").custom(existEmailUser),
    check("cellphone", "Cell Phone is required").not().isEmpty(),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await user.post(req)
    );
});

router.put(
  "/:id",
  [
    check("id", "ID not valid").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await user.put(req)
    );
});

router.delete(
  "/:id",
  [
    check("id", "ID not valid").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await user.delete(req)
    );
});

module.exports = router;
