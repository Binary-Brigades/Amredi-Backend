const userRouter = require("express").Router();

const {
  userProfile,
  editProfile,
  connect,
  assignRole,
} = require("../controllers/user");

const { verifyAccessToken } = require("../helpers/getJwt");

userRouter.get("/user/profile", verifyAccessToken, userProfile);
userRouter.post("/user/edit-profile", verifyAccessToken, editProfile);
userRouter.post("/user/connect", verifyAccessToken, connect);

userRouter.put("/user/assign-role/:userId", verifyAccessToken, assignRole);

module.exports = { userRouter };
