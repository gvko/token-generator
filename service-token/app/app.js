#!/usr/bin/env node

const createError = require('http-errors');
const express = require('express');

const jwtRouter = require('./routes/jwt');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/jwt', jwtRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server started on port ${port} (container exposed: ${process.env.EXPOSED_PORT})`);
});
