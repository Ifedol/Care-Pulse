const Joi = require("joi");

const signupSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phonenumber: Joi.string()
    .pattern(/^(\+|0)[1-9]\d{1,14}$/)
    .message({
      "string.pattern.base":
        "Phone number must be a valid international format",
    })
    .required()
});

const verifyOTPSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().max(6).required().messages({
      "any.only": "Invalid OTP",
    }),
});

const adminVerifySchema = Joi.object({
    otp: Joi.string().max(6).required().messages({
      "any.only": "Invalid OTP",
    }),
});

const setupSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phonenumber: Joi.string()
    .pattern(/^(\+|0)[1-9]\d{1,14}$/)
    .message({
      "string.pattern.base":
        "Phone number must be a valid international format",
    })
    .required(),
    dateofbirth: Joi.string().pattern(datePattern).required().messages({
        "string.pattern.base": "Start date must be in YYYY-MM-DD format",
      }).required(),
      gender :Joi.string()
      .pattern(/^(male|female|other)$/)
      .required()
      .messages({
          "string.pattern.base": "gender must be either male, female, or other",
      }),
    occupation: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(50).required(),
    EmergencyContactname: Joi.string().min(3).max(50).required(),
    EmergencyContactnumber: Joi.string()
    .pattern(/^(\+|0)[1-9]\d{1,14}$/)
    .message({
      "string.pattern.base":
        "Phone number must be a valid international format",
    })
    .required(),
    primaryPhysician: Joi.string().min(3).max(50).required(),
    insuranceProvider: Joi.string().min(3).max(50).required(),
  insurancePolicyNumber: Joi.string()
    .pattern(/^[a-zA-Z0-9]\d{1,14}$/)
    .message({
      "string.pattern.base":
        "Phone number must be a valid international format",
    })
    .required(),
    allergies: Joi.string().min(3).max(50).optional(),
    currentMedication: Joi.string().min(3).max(50).optional(),
    familyHistory: Joi.string().min(3).max(50).optional(),
    pastHistory: Joi.string().min(3).max(50).optional(),
    identificationType: Joi.string().min(3).max(50).required(),
  identificationNumber: Joi.string()
    .pattern(/^[0-9]\d{1,10}$/)
    .message({
      "string.pattern.base":
        "Phone number must be a valid international format",
    })
    .required(),
  image: Joi.object({
    originalname: Joi.string().required(), // The original name of the file
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif")
      .required(), // Validate image type
    size: Joi.number().max(5000000).required(), // Validate size (e.g., max 5MB)
  }).required(),
});


const datePattern = /^\d{4}-\d{2}-\d{2}$/;


const appointmentSchema = Joi.object({
    doctor: Joi.string().min(3).max(50).required(),
    reason: Joi.string().min(3).max(50).required(),
    additionalInfo: Joi.string().min(3).max(50).optional(),
    date: Joi.string().pattern(datePattern).required().messages({
        "string.pattern.base": "Start date must be in YYYY-MM-DD format",
      })
});

const cancelSchema = Joi.object({
    reason: Joi.string().min(3).max(50).required()
});



module.exports = {
    signupSchema,
    verifyOTPSchema,
    setupSchema,
    appointmentSchema,
    adminVerifySchema,
    cancelSchema
}