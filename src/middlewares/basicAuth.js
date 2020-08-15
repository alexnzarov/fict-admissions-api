const basicAuth = require('express-basic-auth');

const users = {
  alexnzarov: 'fwJYzcBjph',
  ruthennium: 'eANRShPyst',
  op: 'nXHsslKjkZ',
};

module.exports = () => basicAuth({ users, challenge: true });
