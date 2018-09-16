#!/usr/bin/env node

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const tokensRouter = require('./routes/tokens');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || '3000';

app.use(bodyParser.json())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  /*
   * Routes
   */
  .use('/tokens', tokensRouter)
  .use('/users', usersRouter)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    next(createError(404));
  })

  // error handler
  .use((err, req, res, next) => {
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
