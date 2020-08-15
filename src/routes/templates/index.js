const template = require('../../core/template');

const get = async (req, res) => {
  res.json({
    templates: await template.getIndex(),
  });
};

module.exports = { 
  path: '/templates',
  get,
};
