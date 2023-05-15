const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const { existDriverId, existEmailDriver } = require('../helpers/db-validators');

const Driver = require('../controllers/drivers.controller')

const router = Router();
const driver = new Driver();

router.get('/', async (req, res, next) => {
      res.json({
        result: await driver.get(req)
    });
});

router.get('/active',async (req, res, next) => {
    res.json(
      await driver.get(req, { status: true } )
    );
});

router.get('/intravel', async (req, res, next) => {
  res.json(
    await driver.get(req, { intravel: true } )
  );
});

router.get('/notintravel', async (req, res, next) => {
  res.json(
    await driver.get(req, { intravel: false } )
  );
});

router.get( '/:id', async (req, res, next) => {
    res.json(
      await driver.getById(req)
    );
});

router.get(
  '/closest/:latitude/:longitude',
  [
    check('latitude', 'ID not valid').isNumeric(),
    check('longitude', 'ID not valid').isNumeric(),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await driver.in3kmGet(req)
    );
});

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email').custom(existEmailDriver),
    check('cellphone', 'Cell Phone is required').not().isEmpty(),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await driver.post(req)
    );
});

router.put(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(existDriverId),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await driver.put(req)
    );
});

router.delete(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(existDriverId),
    validateFields,
  ], async (req, res, next) => {
    res.json(
      await driver.delete(req)
    );
});

module.exports = router;
