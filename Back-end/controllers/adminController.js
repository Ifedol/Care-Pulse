require("express-async-errors");
const doctorservices = require("../services/doctorsservices");
const appointmentservices = require("../services/appointmentservices");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


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
          logger.info(`Admin successfully logged in with ${email}`);
          const token = jwt.sign({ userId: user._id }, config.SECRET, {
            expiresIn: "3h",
          });
          return res.status(200).json({
            status: "success",
            message: "user signed in successfully",
            data: [
              { token: token }
            ],
          });
        
      }
    } catch (err) {
      logger.error("Authentication/Verify:", err);
      next(err);
    }
  };

const addDoctor = async (req, res, next) => {
  const { fullname, email, phonenumber } = req.body;
  try {
    let user = await doctorservices.finddoctorByOne("email", email);
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }
    user = await doctorservices.createdoctor({
      fullname,
      email,
      phonenumber,
      profilePicture
    });
    res.status(200).json({
      status: "success",
      message: "Doctor successfully created"
    });
  }catch (err) {
    logger.error("admin/AddDoctor:", err);
    next(err);
  }
};  

  const doctorGet = async (req, res, next) => {
    const { limit, page } = req.body;
    const paginationLimit = limit || 12;
    const paginationPage = page || 1;
    try {
      const doctors = await doctorservices.findAll(
        { userId: req.userId },
        paginationLimit,
        paginationPage
      );
      return res.status(200).json({
        status: "success",
        message: "doctors succesfully retrieved",
        data: doctors,
      });
    } catch (err) {
      logger.error("admin/Get:", err);
      next(err);
    }
  };

  const appointmentGet = async (req, res, next) => {
    const { limit, page } = req.body;
    const paginationLimit = limit || 12;
    const paginationPage = page || 1;
    try {
      const appointments = await appointmentservices.findAll(
        { userId: req.userId },
        paginationLimit,
        paginationPage
      );
      return res.status(200).json({
        status: "success",
        message: "appointments succesfully retrieved",
        data: appointments,
      });
    } catch (err) {
      logger.error("admin/Get:", err);
      next(err);
    }
  };

  const approveAppointment = async (req, res, next) => {
    try {        
        const { doctor, reason, additionalInfo, date } = req.body;
        const appointment = await appointmentservices.findAppointmentByOne("_id",req.params.id);        
        const doc = await doctorservices.finddoctorByOne("fullname", doctor);      
        appointment.doctor = doctor || appointment.doctor;
        appointment.reason = reason || appointment.reason;
        appointment.additionalInfo = additionalInfo || appointment.additionalInfo;
        appointment.date = date;
        appointment.status = "approved" ;
        await appointment.save();
        await emailServices.sendAppointmentEmailUser(appointment);
        await emailServices.sendAppointmentEmailDoctor(doc, appointment);
      return res.status(200).json({
        status: "success",
        message: "User appointment successfully approved",
        data: appointment
      });
    } catch (err) {
      logger.error("admin/appointmentApprove: ", err);
      next(err);
    }
  }; 


  const cancelAppointment = async (req, res, next) => {
    try {        
        const { doctor, reason, additionalInfo } = req.body;
        const appointment = await appointmentservices.findAppointmentByOne("_id", req.params.id);
        appointment.reason = appointment.reason +`\n Cancelled by admin.\nReason:\n ${reason}`;
        appointment.status = "cancelled" ;
        await appointment.save();
        await emailServices.sendCancellationEmailUser(appointment);
      return res.status(200).json({
        status: "success",
        message: "User appointment successfully cancelled",
        data: appointment
      });
    } catch (err) {
      logger.error("admin/cancelAppointment: ", err);
      next(err);
    }
  }; 

  module.exports = {
    cancelAppointment,
    approveAppointment,
    addDoctor,
    doctorGet,
    appointmentGet,
    verify
  }