const express = require("express");
const validate = require("../utils/validate");
const schema = require("../schema/validationschema");
const adminController = require("../controllers/adminController");
const adminrouter = express.Router();
const middleware = require("../utils/middleware");
const upload = require("../utils/cloudinary");



adminrouter.get(
  "/",
  middleware.verifyToken,
  adminController.appointmentGet
);


adminrouter.post(
  "/login", 
  validate(schema.verifyOTPSchema), 
  adminController.verify
);


adminrouter.post(
    "/appointment/sheculde",
    middleware.verifyToken,
    adminController.approveAppointment
);


adminrouter.post(
    "/doctor",
    middleware.verifyToken,
    upload.single("profilePicture"),
    adminController.addDoctor
);

adminrouter.get(
  "/doctor",
  middleware.verifyToken,
  adminController.doctorGet
);


adminrouter.post(
  "/appointment/cancel",
  middleware.verifyToken,
  adminController.cancelAppointment
);


module.exports = adminrouter;
