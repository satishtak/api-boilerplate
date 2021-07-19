const { InternalServerError } = require('utilities').exceptions;
const Mongoose = require('mongoose');
const { mongo } = require('../config/environments');
// require mongoose module

const options = Object.freeze({
  autoIndex: false, // Don't build indexes
  poolSize: 1, // Maintain up to 1 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
Mongoose.set('debug', mongo.debug || false);
function getMongoDbConnectionUrl() {
  const credentials = mongo.username ? `${mongo.username}:${mongo.password}@` : '';
  return `mongodb://${credentials}${mongo.hosts}/${mongo.database}?authSource=${mongo.authSource ? mongo.authSource : 'admin'}${mongo.replicaSet
    ? `&replicaSet=${mongo.replicaSet}` : ''}`;
}
const makeMongooseConnection = async () => {
  if (Mongoose.connection.readyState) {
    return Mongoose;
  }
  await Mongoose.connect(getMongoDbConnectionUrl(), options);
  // eslint-disable-next-line no-console
  console.info(`Worker ${process.pid} connected to Mongo Database`);
  return Mongoose;
};
const makeDummyModel = require('../models/dummy.model');
const makeDummyCollection = require('./dummy.collection');
const getI18nMessage = require('../helpers/get-i18n-message');

const advertCollection = makeDummyCollection({
  makeMongooseConnection,
  makeDummyModel,
  InternalServerError,
  getI18nMessage,
});

module.exports = Object.freeze({
  advertCollection,
});
