const { queue } = require('async');
const libre = require('libreoffice-convert');

const worker = (task, cb) => {
  const { resolve, reject, buffer } = task;

  libre.convert(buffer, 'pdf', undefined, (err, data) => {
    try {
      if (err) { reject(err); }
      else { resolve(data); }
    } catch (e) {
      console.error(`Uncaught exception in libre queue: `);
      console.error(e);
    }
    
    cb();
  });
};

const libreQueue = queue(worker, 1);

const convert = (buffer) => new Promise((resolve, reject) => libreQueue.push({ resolve, reject, buffer }));

module.exports = {
  convert,
};
