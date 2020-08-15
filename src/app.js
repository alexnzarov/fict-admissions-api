const express = require('express');
const cors = require('cors');
const basicAuth = require('./middlewares/basicAuth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.set('json spaces', 2);

app.use(cors());
app.use(express.json());

const asyncHandle = (fn) => async (req, res, next) => {
  try { await fn(req, res, next); }
  catch (err) { next(err); }
};

const route = (path) => {
  const r = require(`./routes${path}`);
  const routePath = r.path;

  Object.keys(r).forEach(method => {
    if (r != 'path') {
      app[method](routePath, asyncHandle(r[method]));
    }
  });
}

route('/documents/download')

app.use(basicAuth());

route('/templates');
route('/documents');

app.use(errorHandler());

module.exports = app;