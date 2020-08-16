const template = require('../../core/template');
const { v4: uuid } = require('uuid');
const { ServiceException } = require('../../core/exception');
const { getFileName } = require('../../util/fs');
const contentDisposition = require('content-disposition');

const temp = {};

const get = async (req, res) => {
  const { id } = req.query;

  if (!(id in temp)) {
    throw ServiceException.build(400, 'Неправильный идентификатор загрузки');
  }

  const doc = temp[id];

  delete temp[id];

  res.setHeader('Content-Disposition', contentDisposition(doc.filename));
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

  res.status(200).send(doc.buffer);
};

const post = async (req, res) => {
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
  const filename = getFileName(data);
  const id = uuid();

  temp[id] = { buffer, filename };

  res.status(200).json({ id });
};

module.exports = { 
  path: '/documents/download',
  post,
  get,
};
