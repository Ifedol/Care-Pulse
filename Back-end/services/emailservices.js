const logger = require("../utils/logger");
const nodemailer = require("nodemailer");
const config = require("../utils/config");
const userServices = require("./userServices");


//Send Emails
const sendEmail = async (
    userEmail,
    subject = "Daily Reminder",
    reminderText = "",
    htmltext = ""
  ) => {
    try {
      const mailOptions = {
        from: config.EMAIL_USER,
        to: userEmail,
        subject: subject,
        text: reminderText,
        html: htmltext,
      };
  
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS,
        },
      });
      await transporter.sendMail(mailOptions);
      logger.info("email is sent succesfully");
    } catch (err) {
      logger.error("Error in sending mail", err);
      const error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
  };
  
  const sendOtpEmail = async (user_email, otp) => {
    try {
      const subject = "Verify Your Email";
      const logoURL = `https://res.cloudinary.com/dwykmvdhb/image/upload/v1721222788/xn1fblohfrvwopzcmaq3.png`;
      const html = `
        <div style="background-color: #f0f0f0; padding: 20px;max-width: 640px;margin:auto;">
          <section style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="display:block;"><img src= "${logoURL}" alt="Diary Dove logo" style="width:43px; height:36px; display:inline;">
              <h1 style="color: #DA9658; display:inline; ">Dairy Dove</h2>
            </div>
            <h3>Email Verification</h3>
            <p>Enter <b>${otp}</b> in the app to complete your verification. OTP i now your login Pin.</p>
            <p>Ignore this message if you have already been verified.</p>
          </section>
        </div>`;
      await sendEmail(user_email, subject, "", html);
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  };


  const sendAppointmentEmailUser = async (appointment) => {
    try {
      const {email,date, expectedDate, doctor} = appointment
      const subject = `---DO NOT REPLY---`;
      const logoURL = `https://res.cloudinary.com/dwykmvdhb/image/upload/v1721222788/xn1fblohfrvwopzcmaq3.png`;
      const html = `
        <div style="background-color: #f0f0f0; padding: 20px;max-width: 640px;margin:auto;">
          <section style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="display:block;"><img src= "${logoURL}" alt="Care-Pulse logo" style="width:43px; height:36px; display:inline;">
              <h1 style="color: #DA9658; display:inline; ">Care-Pulse</h2>
            </div>
            <h3>Successfully Schedulling of Appointment</h3>
            <p>An Appointment with ${doctor} expected for ${expectedDate}  has been successfully created for ${date} by an admin</p>
            <p>Do not reply this message as this is a bot and cannot respond.</p>
          </section>
        </div>`;
      await sendEmail(email, subject, "", html);
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  };


  const sendAppointmentEmailDoctor = async (doctor, appointment) => {
    try {
      const {email} = doctor;
      const {fullname, date} = appointment;
      const subject = `---DO NOT REPLY---`;
      const logoURL = `https://res.cloudinary.com/dwykmvdhb/image/upload/v1721222788/xn1fblohfrvwopzcmaq3.png`;
      const html = `
        <div style="background-color: #f0f0f0; padding: 20px;max-width: 640px;margin:auto;">
          <section style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="display:block;"><img src= "${logoURL}" alt="Care-Pulse logo" style="width:43px; height:36px; display:inline;">
              <h1 style="color: #DA9658; display:inline; ">Care-Pulse</h2>
            </div>
            <h3>Successfully Schedulling of Appointment</h3>
            <p>An Appointment with ${fullname} has been successfully created for ${date} by an admin</p>
            <p>Do not reply this message as this is a bot and cannot respond.</p>
          </section>
        </div>`;
      await sendEmail(email, subject, "", html);
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  };


  const sendCancellationEmailUser = async (appointment) => {
    try {
      const {email, doctor, expectedDate} = appointment
      const subject = `---DO NOT REPLY---`;
      const logoURL = `https://res.cloudinary.com/dwykmvdhb/image/upload/v1721222788/xn1fblohfrvwopzcmaq3.png`;
      const html = `
        <div style="background-color: #f0f0f0; padding: 20px;max-width: 640px;margin:auto;">
          <section style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="display:block;"><img src= "${logoURL}" alt="Care-Pulse logo" style="width:43px; height:36px; display:inline;">
              <h1 style="color: #DA9658; display:inline; ">Care-Pulse</h2>
            </div>
            <h3>Cancellation of Appointment</h3>
            <p>An Appointment with ${doctor} expected for ${expectedDate}  has been cancelled by an admin</p>
            <p>Do not reply this message as this is a bot and cannot respond.</p>
          </section>
        </div>`;
      await sendEmail(email, subject, "", html);
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  };

module.exports ={
  sendAppointmentEmailDoctor,
  sendAppointmentEmailUser,
  sendCancellationEmailUser,
  sendOtpEmail
}