const express = require("express");
const validate = require("../utils/validate");
const schema = require("../schema/validationschema");
const adminController = require("../controllers/adminController");
const adminrouter = express.Router();
const middleware = require("../utils/middleware");



adminrouter.post(
  "/signup",
  validate(schema.signupSchema, "body"),
  adminController.signup
);


adminrouter.post(
  "/login", 
  validate(schema.loginSchema), 
  adminController.login
);


adminrouter.post(
  "/setup",
  validate(schema.timeSchema),
  middleware.verifyToken,
  adminController.setup
);


adminrouter.get(
  "/personalinfo",
  middleware.verifyToken,
  adminController.personalinfo
);


adminrouter.post(
  "/appointment",
  middleware.verifyToken,
  adminController.appointment
);


module.exports = adminrouter;
