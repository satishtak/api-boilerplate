/**
 * @method
 * @param dbConnection
 * @returns {*}
 */
module.exports = function makeDummyModel({ dbConnection }) {
  try {
    return dbConnection.model('Dummy');
  } catch (e) {
    const dummySchema = new dbConnection.Schema({
      title: { type: String, trim: true, default: null },
      updatedBy: { type: dbConnection.Schema.Types.ObjectId },
      updatedAt: { type: Date, default: Date.now() },
    }, { collection: 'dummy' });
    return dbConnection.model('Dummy', dummySchema);
  }
};
