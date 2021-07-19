// const { NotFoundError, InternalServerError } = require('utilities').exceptions;

// const { fileValidator } = require('../helpers/file-upload-validator');
// const getI18nMessage = require('../helpers/get-i18n-message');
// const { advertCollection } = require('../data-access');
// const { schemaValidator } = require('../helpers/schema-validator');
// const config = require('../config/environments');

const makeGreetWelcomeToService = require('./greet-welcome-to-service');

const greetWelcomeToService = makeGreetWelcomeToService();

module.exports = Object.freeze({
  greetWelcomeToService,
});
