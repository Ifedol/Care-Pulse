const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userServices = require("../services/userServices")

const UserSchema = new mongoose.Schema({
  //More input needed like name and all
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true },
  otp: { type: String, default: null },
  dateofbirth: { type: String, default: null },
  gender: { type: String, default: null },
  occupation: { type: String, default: null },
  address: { type: String, default: null },
  EmergencyContactname: { type: String, default: null },
  EmergencyContactnumber: { type: String, default: null },
  primaryPhysician: { type: String, default: null },
  insuranceProvider: { type: String, default: null },
  insurancePolicyNumber: { type: String, default: null },
  allergies: { type: String, default: null },
  currentMedication: { type: String, default: null },
  familyHistory: { type: String, default: null },
  pastHistory: { type: String, default: null },
  identificationType: { type: String, default: null },
  identificationNumber: { type: String, default: null },
  image: { type: String, default: null },
});

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", UserSchema);
