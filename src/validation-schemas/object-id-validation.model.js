module.exports = (joi) => joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  .label('Id')
  .messages({
    'string.pattern.base': 'Invalid Id Supplied',
  });
