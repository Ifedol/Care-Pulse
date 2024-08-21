require("express-async-errors");
const userServices = require("../services/userServices");
const emailServices = require("../services/emailservices")
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { set } = require("mongoose");
const upload = require("../utils/cloudinary");


const signup = async (req, res, next) => {
    const { fullname, email, phonenumber, } = req.body;
    try {
      let user = await userServices.findUserByOne("email", email);
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "Email already exists",
        });
      }
      user = await userServices.findUserByOne("phonenumber", phonenumber);
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "Phonenumber is already taken",
        });
      }
      user = await userServices.createUser({
        fullname,
        email,
        phonenumber,
      });
      const otp = await userServices.createUserOtp(user._id);
      await emailServices.sendOtpEmail(email, otp);
      res.status(200).json({
        status: "PENDING",
        message: "Verification OTP sent",
        data: { email },
      });
    } catch (err) {
      logger.error("Authentication/Signup:", err);
      next(err);
    }
  };
  
  // Verify OTP
  const verify = async (req, res, next) => {
    try {
      let { email, otp } = req.body;
      const user = await userServices.findUserByOne("email", email);
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User does not exists please re-route to sign up page",
        });
      } else {
        const hashedotp = user.otp;
          const validotp = await bcrypt.compare(otp, hashedotp);
          if (!validotp) {
            return res.status(404).json({
              status: "error",
              message: "Invalid OTP",
            });
          }
          logger.info(`User successfully logged in with ${email}`);
          const token = jwt.sign({ userId: user._id }, config.SECRET, {
            expiresIn: "3h",
          });
          return res.status(200).json({
            status: "success",
            message: "user signed in successfully",
            data: [
              { token: token },
              { fullname: user.fullname },
              { email: user.email },
              { phonenumber: user.phonenumber },
            ],
          });
        
      }
    } catch (err) {
      logger.error("Authentication/Verify:", err);
      next(err);
    }
  };

  const personalinfo = async (req, res, next) => {
    try {        
        const { dateofbirth, gender, occupation, address, EmergencyContactname, EmergencyContactnumber, primaryPhysician, insuranceProvider, insurancePolicyNumber, allergies, currentMedication, familyHistory, pastHistory,identificationType, image } = req.body;
        const user = await userServices.findUserByOne("_id", req.userId);      
        user.dateofbirth = dateofbirth || user.dateofbirth;
        user.gender = gender || user.gender;
        user.occupation = occupation || user.occupation;
        user.address = address || user.address;
        user.EmergencyContactname = EmergencyContactname || user.EmergencyContactname;
        user.EmergencyContactnumber = EmergencyContactnumber || user.EmergencyContactnumber;
        user.primaryPhysician = primaryPhysician || user.primaryPhysician;
        user.insuranceProvider = insuranceProvider || user.insuranceProvider;
        user.insurancePolicyNumber = insurancePolicyNumber || user.insurancePolicyNumber;
        user.allergies = allergies || user.allergies;
        user.currentMedication = currentMedication || user.currentMedication;
        user.familyHistory = familyHistory || user.familyHistory;
        user.pastHistory = pastHistory || user.pastHistory;
        user.identificationType = identificationType || user.identificationType;
        user.identificationNumber = identificationNumber || user.identificationNumber;
        user.image = image || req.file.path;;
    await user.save();
      return res.status(200).json({
        status: "success",
        message: "User data successfully svaed",
      });
    } catch (err) {
      logger.error("login/personalinfo: ", err);
      next(err);
    }
  };  

  const setAppointment = async (req, res, next) => {
    try {        
        const { doctor, reason, additionalInfo, expectedDate } = req.body;
        const user = await userServices.findUserByOne("_id", req.userId);        
        const appointment = await appointmentservices.createUser({
        fullname,
        email,doctor, reason, additionalInfo, date, status:"pending" 
      });
        await emailServices.sendPend();
        return res.status(200).json({
        status: "success",
        message: "User appointment successfully sent to admin for approval"
      });
    } catch (err) {
      logger.error("Settings/personalinfo: ", err);
      next(err);
    }
  };  

module.exports ={
    signup,
    verify,
    setAppointment,
    personalinfo
}