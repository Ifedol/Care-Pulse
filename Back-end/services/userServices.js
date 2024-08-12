const bcrypt = require("bcryptjs");
const User = require("../models/usermodel");
const logger = require("../utils/logger");

const findUserByOne = async (field, value) => {
  try {
    const query = {};
    query[field] = value;
    const user = await User.findOne(query);
    return user;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    logger.info(`User ${user._id} successfully created`);
    return user;
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};

const updateUserByOne = async (userId) => {
  try {
    const user = await User.updateOne({ _id: userId }, { verified: true });
    logger.info(`User profile successfully updated ${userId}`);
  } catch (err) {
    logger.error(err);
    const error = new Error("Internal Server Error");
    error.status = 500;
    throw error;
  }
};



const createUserOtp = async (userId) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const newotp = `${Math.floor(100000 + Math.random() * 900000)}`;
      const hashedOTP = await bcrypt.hash(newotp, salt);
      const userOtp = new Otp({
        userId: userId,
        otp: hashedOTP,
        createdat: Date.now(),
        expiresat: Date.now() + 360000,
      });
      await userOtp.save();
      return newotp;
    } catch (err) {
      logger.info(err.message);
      const error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
  };


module.exports = {
    createUser,
    createUserOtp,
    findUserByOne,
    updateUserByOne
}