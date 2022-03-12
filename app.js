const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const mongoConnection = require('./mongo/dbConnection');
const { validateApiKey } = require('./middlewares/validateApiKey');

// routers
const indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employee');

const app = express();

mongoConnection.createConnection(); // opens a DB connection
// app.use(morganLogger('dev')); // prints logs for each request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(validateApiKey);
app.use('/', indexRouter);
app.use('/employee', employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

module.exports = app;
