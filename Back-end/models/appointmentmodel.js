const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const appointmentServices = require("../services/appointmentservices")

const appointmentSchema = new mongoose.Schema({
  //More input needed like name and all  
  fullname: { type: String, required: true },
  userid: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  doctor: { type: String, required: true },
  reason: { type: String, required: true},
  additionalInfo: { type: String, required:false},
  expectedDate: { type: String, required: true },
  date: { type: String, default: null},
  status: { type: String, required: true }
});


appointmentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("appointments", appointmentSchema);
