const express = require("express");
const validate = require("../utils/validate");
const schema = require("../schema/validationschema");
const userController = require("../controllers/userController");
const userrouter = express.Router();
const middleware = require("../utils/middleware");
const upload = require("../utils/cloudinary");



userrouter.post(
  "/signup",
  validate(schema.signupSchema, "body"),
  userController.signup
);


userrouter.post(
  "/login", 
  validate(schema.verifyOTPSchema), 
  userController.verify
);


// userrouter.post(
//   "/setup",
//   validate(schema.setupSchema),
//   middleware.verifyToken,
//   userController.setup
// );


userrouter.get(
  "/personalinfo",
  middleware.verifyToken,
  upload.single("image"),
  userController.personalinfo
);


userrouter.post(
  "/appointment",
  middleware.verifyToken,
  userController.setAppointment
);


module.exports = userrouter;
