const { Router} = require("express");
const {login, signup, logout} = require("../controllers/user.controller");

const authenticator = require("../middleware/auths");

const UserRouter = Router();

UserRouter.post("/login", login);
UserRouter.post("/signup", signup);
UserRouter.post("/logout",authenticator, logout);

module.exports = UserRouter;