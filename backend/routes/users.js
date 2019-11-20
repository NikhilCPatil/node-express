const express = require("express");
const authcheck = require("../middelware/authcheck");
const UserController = require("../controller/userController");
const router = express.Router();


router.post('/login', UserController.loginUser);
router.get("/:id", authcheck, UserController.getUserById);
router.get("/", authcheck, UserController.getUserList);
router.post("/", authcheck,UserController.createUser);
router.patch("/:id", authcheck ,UserController.updateUser);
router.delete("/:id", authcheck, UserController.deleteUser);

module.exports = router;