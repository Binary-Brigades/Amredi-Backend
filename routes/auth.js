const router = require("express").Router()
const { Register } = require("../controllers/auth")

router.get("/auth/register", Register)


module.exports = { router}