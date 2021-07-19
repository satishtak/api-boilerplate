// import third-party libraries
// eslint-disable-next-line no-unused-vars
const joi = require('joi');
// import errors
const { ValidationError, InternalServerError } = require('utilities').exceptions;
const getI18nMessage = require('../get-i18n-message');
// import schemas
const objectIdValidation = require('../../validation-schemas/object-id-validation.model')(joi);
const advertSchema = require('../../validation-schemas/advert.model')(joi);
// validation options for joi
const validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};
// create a object of schemas
const schemas = Object.create({
  advertSchema,
  objectIdValidation,
});

const errorI18nMapping = {
  'string.pattern.base': 'invalid',
  'number.min': 'number_min',
  'number.max': 'number_max',
  'string.min': 'string_min',
  'string.max': 'string_max',
  'string.base': 'string_base',
  'string.email': 'invalid',
  'string.length': 'string_length',
  'number.positive': 'number_positive',
  'number.integer': 'invalid',
  'number.base': 'invalid',
  'boolean.base': 'invalid',
  'date.base': 'invalid',
  'date.format': 'invalid',
  'date.less': 'invalid',
  'any.required': 'mandatory',
  'array.includesRequiredKnowns': 'array_includesRequiredKnowns',
};

/**
 *
 * @param object {!Object} that need to be validated
 * @param schemaName {!String} name of schema to be validated against
 * @returns {Promise<unknown>}
*/
const schemaValidator = (object, schemaName) => new Promise((resolve, reject) => {
  if (!object) {
    reject(new ValidationError(getI18nMessage({
      key: 'invalid_parameters',
    }), 'ValidationError'));
  }
  if (!schemaName) {
    reject(new InternalServerError(getI18nMessage({
      key: 'something_went_wrong',
    }), 'InternalServerError'));
  }
  // validate the object with specified schema type
  const { error, value } = schemas[schemaName].validate(object, validationOptions);

  if (error) {
    // extract the multiple error in array
    let extractedError = error.details.map(({ type, context, path }) => getI18nMessage({
      key: errorI18nMapping[type] ? errorI18nMapping[type] : 'invalid',
      label: context.label ? context.label : path[path.length],
      limit: context.limit || null,
    }));
    extractedError = [...new Set(extractedError)];
    reject(new ValidationError(JSON.stringify(extractedError), 'ValidationError'));
  }
  resolve(value);
});

module.exports = Object.create({
  schemaValidator,
});
