const userRouter = require("express").Router()

const { userProfile } = require("../controllers/user")
const { verifyAccessToken } = require("../helpers/getJwt")

userRouter.get("/user/profile", verifyAccessToken, userProfile)
// userRouter.get("/user/edit-profile", verifyAccessToken, userProfile)


module.exports = { userRouter }