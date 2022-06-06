const express = require("express");
const router = express.Router();

const UpdateController = require("../controller/UpdateContoller");
const UserCheck = require("../middleware/userCheck");

router.get("/", UserCheck.checkLoggedIn, UserCheck.isAdmin, UpdateController.all);

router.get("/allUser/", UserCheck.checkLoggedIn, UpdateController.userUpdates);

router.get(
  "/allProject/:projectid",
  UserCheck.checkLoggedIn,
  UserCheck.checkProject,
  UpdateController.userProjectUpdates
);

router.get("/allForUser", UserCheck.checkLoggedIn, UpdateController.getAllUserProjectsUpdates);

export default router;
