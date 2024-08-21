const bcrypt = require("bcrypt");
const Doctor = require("../models/doctormodel");
const logger = require("../utils/logger");

const finddoctorByOne = async (field, value) => {
  try {
    const query = {};
    query[field] = value;
    const doctor = await Doctor.findOne(query);
    return doctor;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const finddoctorById = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    return doctor;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const createdoctor = async (doctorData) => {
  try {
    const doctor = new Doctor(doctorData);
    await doctor.save();
    logger.info(`doctor ${doctor._id} successfully created`);
    return doctor;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    next(err)
  }
};

const findAll = async (paginationLimit, paginationPage) => {
  try {
    const doctor = await Doctor.find({})
      .sort({ _id: -1 })
      .limit(paginationLimit)
      .skip((paginationPage - 1) * paginationLimit);
    return doctor;
  } catch (err) {
    logger.info(err.message);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};


module.exports = {
    createdoctor,
    finddoctorByOne,
    finddoctorById,
    findAll
}