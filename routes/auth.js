const router = require("express").Router()
const { Register, verifyAccount } = require("../controllers/auth")

router.post("/auth/register", Register)
router.post("/auth/verify-account", verifyAccount)


module.exports = { router}