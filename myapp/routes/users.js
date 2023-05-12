const { Router } = require("express");
const { check } = require("express-validator");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userActiveGet,
  userIntravelGet,
  userGetbyId,
} = require("../controllers/users");
const { validateFields } = require("../middlewares/validate");
const { existUserId, existEmailUser } = require("../helpers/db-validators");

const router = Router();

router.get("/", userGet);
router.get("/active", userActiveGet);
router.get("/intravel", userIntravelGet);
router.get(
  "/:id",
  [check("id", "ID not valid").isMongoId(), validateFields],
  userGetbyId
);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email").custom(existEmailUser),
    check("cellphone", "Cell Phone is required").not().isEmpty(),
    validateFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "ID not valid").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    check("id", "ID not valid").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  userDelete
);

module.exports = router;
