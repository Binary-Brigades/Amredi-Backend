authRouter = require("express").Router();
const { Register, verifyAccount, login } = require("../controllers/auth");

authRouter.post("/auth/register", Register);
authRouter.post("/auth/verify-account", verifyAccount);
authRouter.post("/auth/login", login);

module.exports = { authRouter };
