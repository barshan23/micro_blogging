const errorHTTPStatusCode = {
    userNotCreated: 400,
    passwordValidationError: 401,
    invalidCredentialsError: 401
  },
  DEFAULT_ERROR_HTTP_STATUS_CODE = 500,
  DEFAULT_ERROR_MESSAGE = 'Something went wrong';

module.exports = {
  handleError: (error = {}, res) => {
    const statusCode = errorHTTPStatusCode[error.name] || DEFAULT_ERROR_HTTP_STATUS_CODE,
      message = error.message || DEFAULT_ERROR_MESSAGE;

    return res.status(statusCode).json({
      error: message
    });
  }
};