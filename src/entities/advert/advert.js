/**
 *
 * @param moment
 * @param schemaValidator
 */
module.exports = function buildMakeAdvert({
  moment,
  schemaValidator,
}) {
  return async function makeAdvert({
    activeUserId, // will be available in headers as x-active-static-page-id
    ...advertInfo
  }) {
    const {
      title,
      status,
      pageLink,
      advertImagePath,
      advertImageFileName,
    } = await schemaValidator({ ...advertInfo }, 'advertSchema');
    const date = moment().toISOString();
    return Object.freeze({
      getTitle: () => title,
      getPublishedOn: () => (status ? date : null),
      getPageLink: () => pageLink,
      getStatus: () => status,
      getAdvertImagePath: () => advertImagePath,
      getAdvertImageFileName: () => advertImageFileName,
      getUpdatedAt: () => date,
      getUpdatedBy: () => activeUserId,
    });
  };
};
