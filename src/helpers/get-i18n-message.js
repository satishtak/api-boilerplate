module.exports = function getI18nMessage({
  key,
  ...options
}) {
  let result = '';
  const newOptions = {
    ...options,
  };
  if (global.i18n.exists(key)) {
    result = global.i18n.t(key, { ...newOptions });
  } else {
    result = global.i18n.t('something_went_wrong');
  }
  return result;
};
