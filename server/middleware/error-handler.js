const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong, please try again later',
  }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
  }
  //return res.status(500).json(err)
  return res.status(customError.statusCode).json(customError.msg)
}

module.exports = errorHandlerMiddleware
