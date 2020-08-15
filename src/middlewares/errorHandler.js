module.exports = () => function(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || err.toString();

  console.log(`[${new Date()}] [${req.auth ? req.auth.user : 'none'}] Server responded with ${status}: ${message}`)

  res.status(status).json({ status, message });
};
