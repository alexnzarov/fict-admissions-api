const basicAuth = require('express-basic-auth');

const users = JSON.parse(process.env.AUTH_USERS);

module.exports = () => basicAuth({ users, challenge: true });
