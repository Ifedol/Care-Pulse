const bcrypt = require("bcrypt");
const Appointment = require("../models/appointmentmodel");
const logger = require("../utils/logger");

const findAppointmentByOne = async (field, value) => {
  try {
    const query = {};
    query[field] = value;
    const appointment = await Appointment.findOne(query);
    return appointment;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const findAll = async ( paginationLimit, paginationPage) => {
  try {
    const appointment = await Appointment.find({})
      .sort({ _id: -1 })
      .limit(paginationLimit)
      .skip((paginationPage - 1) * paginationLimit);
    return appointment;
  } catch (err) {
    logger.info(err.message);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const createAppointment = async (AppointmentData) => {
  try {
    const appointment = new Appointment(AppointmentData);
    await appointment.save();
    logger.info(`Appointment ${appointment._id} successfully created`);
    return appointment;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const updateAppointmentByOne = async (appointmentId) => {
  try {
    const appointment = await Appointment.updateOne({ _id: appointmentId }, { verified: true });
    logger.info(`Appointment profile successfully updated ${appointmentId}`);
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};


module.exports = {
    createAppointment,
    findAppointmentByOne,
    updateAppointmentByOne,
    findAll
}