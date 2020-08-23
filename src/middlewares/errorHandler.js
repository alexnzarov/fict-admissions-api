module.exports = () => function(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message ? err.message : 'Під час виконання запиту виникла помилка';
  const details = err.details || (!err.message ? err.toString() : undefined);

  console.log(`[${new Date()}] [${req.auth ? req.auth.user : 'none'}] Server responded with ${status}: ${message}`)

  res.status(status).json({ status, message, details });
};
