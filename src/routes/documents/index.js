const template = require('../../core/template');
const telegram = require('../../core/telegram');
const { ServiceException } = require('../../core/exception');
const { getFileName } = require('../../util/fs');

const post = async (req, res) => {
  const { user } = req.auth;
  const { template: templateName, data } = req.body;

  const index = await template.getIndex();
  const t = index.find(t => t.document === templateName);

  if (!t) {
    throw ServiceException.build(400, 'Неправильное название шаблона');
  }

  if (typeof(data) != 'object') {
    throw ServiceException.build(400, 'Данные должны быть в формате обьекта');
  }

  for (let field of t.template) {
    if (typeof(data[field.token]) != 'string') {
      throw ServiceException.build(400, `Не хватает параметра "${field.name}" для шаблона`);
    }
  }

  const buffer = await template.getDocument(templateName, data);

  telegram.sendDocument(getFileName(data), buffer, { user, template: t.name });

  res.status(200).send();
};

module.exports = { 
  path: '/documents',
  post,
};
