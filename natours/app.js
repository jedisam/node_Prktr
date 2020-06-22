const morgan = require('morgan');
const express = require('express');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// unhandled routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this Server`,
  // });
  // const err = new Error(`Can not find ${req.originalUrl} on this Server.`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can not find ${req.originalUrl} on this Server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
