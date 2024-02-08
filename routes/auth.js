const router = require("express").Router();
const { Register, verifyAccount, login } = require("../controllers/auth");

router.post("/auth/register", Register);
router.post("/auth/verify-account", verifyAccount);
router.post("/auth/login", login);

module.exports = { router };
