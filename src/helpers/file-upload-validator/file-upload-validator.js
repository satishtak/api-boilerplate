module.exports = function makeFileValidator({
  ValidationError,
  getI18nMessage,
}) {
  /**
   *
   * @param files
   * @param maxFiles
   * @param maxSize
   * @param supportedTypes
   * @returns {boolean}
   */
  function fileValidator({
    files,
    maxFiles = 1,
    maxSize = 2,
    supportedTypes = ['png', 'svg'],
  }) {
    if (!files.length) {
      throw new ValidationError(getI18nMessage({
        key: 'no_files_provided',
      }), 'ValidationError');
    }
    if (files.length > maxFiles) {
      throw new ValidationError(getI18nMessage({
        key: 'file_max',
        limit: maxFiles,
      }), 'ValidationError');
    }
    let fileGreaterThanMaxSize = false;
    let unsupportedFileType = false;
    files.forEach(({ mimetype, fileSize }) => {
      if (fileSize > maxSize) {
        fileGreaterThanMaxSize = true;
      }
      unsupportedFileType = !supportedTypes.some((item) => mimetype.includes(item));
    });
    if (fileGreaterThanMaxSize) {
      throw new ValidationError(getI18nMessage({
        key: 'file_max_size',
        limit: maxSize,
      }), 'ValidationError');
    }
    if (unsupportedFileType) {
      throw new ValidationError(getI18nMessage({
        key: 'file_unsupported',
        label: supportedTypes.join(','),
      }), 'ValidationError');
    }
    return true;
  }
  return fileValidator;
};
