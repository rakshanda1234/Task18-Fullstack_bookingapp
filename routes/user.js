const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

//post request
router.post("/add-user", userController.adduser);

//get request
router.get("/get-users", userController.getuser);

router.delete("/delete-user/:id", userController.deleteuser);

// router.error("/error", errorController);

module.exports = router;
