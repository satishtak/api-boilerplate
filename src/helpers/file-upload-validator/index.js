const { ValidationError } = require('utilities').exceptions;
const makeFileValidator = require('./file-upload-validator');
const getI18nMessage = require('../get-i18n-message');

const fileValidator = makeFileValidator({
  ValidationError,
  getI18nMessage,
});

module.exports = Object.freeze({
  fileValidator,
});
