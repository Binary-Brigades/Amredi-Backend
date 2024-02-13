const userRouter = require("express").Router()

const { userProfile, editProfile, connect} = require("../controllers/user")
const { verifyAccessToken } = require("../helpers/getJwt")

userRouter.get("/user/profile", verifyAccessToken, userProfile)
userRouter.post("/user/edit-profile", verifyAccessToken, editProfile)
userRouter.post("/user/connect", verifyAccessToken, connect)


module.exports = { userRouter }