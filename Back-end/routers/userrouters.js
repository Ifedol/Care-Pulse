const express = require("express");
const validate = require("../utils/validate");
const schema = require("../schema/validationschema");
const userController = require("../controllers/usercontroller");
const userrouter = express.Router();
const middleware = require("../utils/middleware");



userrouter.post(
  "/signup",
  validate(schema.signupSchema, "body"),
  userController.signup
);


userrouter.post(
  "/login", 
  validate(schema.loginSchema), 
  userController.login
);


userrouter.post(
  "/setup",
  validate(schema.timeSchema),
  middleware.verifyToken,
  userController.setup
);


userrouter.get(
  "/personalinfo",
  middleware.verifyToken,
  userController.personalinfo
);


userrouter.post(
  "/appointment",
  middleware.verifyToken,
  userController.appointment
);


module.exports = userrouter;
