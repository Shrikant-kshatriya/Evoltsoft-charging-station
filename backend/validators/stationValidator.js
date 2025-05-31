const Joi = require('joi');

const stationValidationSchema = Joi.object({
  _id: Joi.string().optional(), // Optional for updates, required for creation
  name: Joi.string().required(),
  location: Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(
      Joi.number().required()
    ).length(2).required() // [longitude, latitude]
  }).required(),
  status: Joi.string().valid('active', 'inactive').default('active'),
  powerOutput: Joi.number().min(0).default(0),
  connecterType: Joi.string().valid('Type1', 'Type2', 'CCS', 'CHAdeMO', 'Tesla').default('Type2'),
  createdAt: Joi.date().optional(),
  __v: Joi.optional(),
});

module.exports = stationValidationSchema;
