const projectRouter = require("express").Router();

const projectController = require("../controllers/projectController");
const { verifyAccessToken } = require("../helpers/getJwt");

projectRouter.post(
  "/project/group/:groupId/create",
  verifyAccessToken,
  projectController.createProject
);

module.exports = { projectRouter };
