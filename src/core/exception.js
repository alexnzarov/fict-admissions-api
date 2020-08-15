class ServiceException extends Error {
  constructor(status, message) {
    super();
    
    this.status = status;
    this.message = message;
  }
}

ServiceException.build = (status, message) => {
  return new ServiceException(status, message);
};

module.exports = {
  ServiceException,
};