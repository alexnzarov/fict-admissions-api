const fs = require('../util/fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const getIndex = async () => {
  const content = await fs.readFile(`${__dirname}/../../templates/index.json`, 'utf8');
  return JSON.parse(content);
};

const getDocument = async (file, data) => {
  const content = await fs.readFile(`${__dirname}/../../templates/${file}`, 'binary');
  const zip = new PizZip(content);
  const document = new Docxtemplater(zip);

  document.setData(data);
  document.render();

  return document.getZip().generate({
    type: 'nodebuffer',
  });
};

module.exports = {
  getIndex,
  getDocument,
};