const fs = require('fs');
const sanitizeFilename = require('sanitize-filename');
const { v4: uuid } = require('uuid');

const readFile = (path, encoding) => new Promise((resolve, reject) => fs.readFile(path, { encoding }, (err, data) => err ? reject(err) : resolve(data)));

const getFileName = (data) => {
  const parts = [];
  const fields = ['last_name', 'first_name', 'father_name'];
  for (let token of fields) {
    if (data[token]) {
      parts.push(data[token]);
    }
  }

  return sanitizeFilename(parts.length > 0 ? parts.join('-') : uuid());
};

module.exports = {
  readFile,
  getFileName,
};