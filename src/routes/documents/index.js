const template = require('../../core/template');
const telegram = require('../../core/telegram');
const { ServiceException } = require('../../core/exception');
const { getFileName } = require('../../util/fs');
const libre = require('../../core/libre');

const post = async (req, res) => {
  const { user } = req.auth;
  const { template: templateName, data } = req.body;

  const index = await template.getIndex();
  const t = index.find(t => t.document === templateName);

  if (!t) {
    throw ServiceException.build(400, 'Неправильна назва шаблона');
  }

  if (typeof(data) != 'object') {
    throw ServiceException.build(400, 'Дані повинні бути у формі об\'єкта');
  }

  for (let field of t.template) {
    if (typeof(data[field.token]) != 'string') {
      throw ServiceException.build(400, `Не вистачає параметра "${field.name}" для шаблону`);
    }
  }

  const buffer = await template.getDocument(templateName, data);
  const pdf = await libre.convert(buffer);

  telegram.sendDocument(getFileName(data) + '.pdf', pdf, { user, template: t.name });

  res.status(200).send();
};

module.exports = { 
  path: '/documents',
  post,
};
