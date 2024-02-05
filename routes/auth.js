const router = require("express").Router()
const { Register } = require("../controllers/auth")

router.post("/auth/register", Register)


module.exports = { router}