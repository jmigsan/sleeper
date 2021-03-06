const errorHandler = (err, req, res, next) => {
  console.log(err)
  
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "i ain't gonna keep it a stack, soz" : err.stack,
  });
};

module.exports = {
  errorHandler
}