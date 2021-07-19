/**
 *
 * @param makeMongooseConnection
 * @param advertheroBannerConfigModel
 * @param InternalServerError
 * @param getI18nMessage
 */
module.exports = function makeDummyCollection({
  makeMongooseConnection,
  makeDummyModel,
  InternalServerError,
  getI18nMessage,
}) {
  /**
   *
   * @param projectQuery
   * @param filterObj
   * @returns {Promise<void|*>}
   */
  async function listDummy() {
    const projectQuery = {
      title: 1,
      publishedOn: 1,
      pageLink: 1,
      status: 1,
      advertType: 1,
      advertImagePath: 1,
      advertImageFileName: 1,
      staticImagePath: 1,
    };
    try {
      const dbConnection = await makeMongooseConnection();
      return await makeDummyModel({ dbConnection }).find(
        {},
        { ...projectQuery },
      ).lean();
    } catch ({ message: ErrorMessage, name: ErrorName }) {
      throw new InternalServerError(getI18nMessage({
        key: 'something_went_wrong',
      }), 'InternalDatabaseError', { ErrorName, ErrorMessage });
    }
  }

  return Object.freeze({
    listDummy,
  });
};
