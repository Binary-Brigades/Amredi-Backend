const groupRouter = require("express").Router();

const {
  addMemberToGroup,
  getGroups,
  createGroup,
} = require("../controllers/groupController");
const { verifyAccessToken } = require("../helpers/getJwt");

groupRouter.post("/group/create", verifyAccessToken, createGroup);
groupRouter.get("/group/getall", verifyAccessToken, getGroups);
groupRouter.post("/group/:groupId/add", verifyAccessToken, addMemberToGroup);

module.exports = { groupRouter };
