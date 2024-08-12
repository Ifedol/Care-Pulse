require("express-async-errors");
const userServices = require("../services/userService");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


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
      await otpServices.deleteUserOtpsByUserId(user._id);
      const otp = await otpServices.createUserOtp(user._id);
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
      }
      const userotprecord = await otpServices.findUserOtpByUserId(user._id);
      if (!userotprecord) {
        return res.status(404).json({
          status: "error",
          message: "User has already been verified please login",
        });
      } else {
        const hashedotp = userotprecord.otp;
        const expiresat = userotprecord.expiresat;
        if (expiresat < Date.now()) {
          await otpServices.deleteUserOtpsByUserId(user._id);
          return res.status(404).json({
            status: "error",
            message: "OTP has expired",
          });
        } else {
          const validotp = await bcrypt.compare(otp, hashedotp);
          if (!validotp) {
            return res.status(404).json({
              status: "error",
              message: "Invalid OTP",
            });
          }
          await userServices.updateUserByOne(user._id);
          await otpServices.deleteUserOtpsByUserId(user._id);
          logger.info(`Email successfully verified for ${email}`);
          return res.status(200).json({
            status: "success",
            message: "User email verified successfully",
          });
        }
      }
    } catch (err) {
      logger.error("Authentication/Verify:", err);
      next(err);
    }
  };