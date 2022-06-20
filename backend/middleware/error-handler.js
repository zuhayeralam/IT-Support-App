const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ msg: 'an error occured' });
};

export default errorHandlerMiddleware;
