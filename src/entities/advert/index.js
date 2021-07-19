const moment = require('moment');
const { schemaValidator } = require('../../helpers/schema-validator');
const buildMakeAdvert = require('./advert');

const makeAdvert = buildMakeAdvert({
  moment,
  schemaValidator,
});

module.exports = Object.freeze({
  makeAdvert,
});
