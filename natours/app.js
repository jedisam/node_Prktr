const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
// Global Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// rate limiter
const limiter = rateLimit({
  max: 100,
  WindowMs: 60 * 60 * 1000,
  message: 'To many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);
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
