const path = require('path');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const app = express(feathers());

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression and body parsing
  .use(helmet())
  .use(cors())
  .use(compress())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  // Set up Plugins and providers
  .configure(express.rest())
  .configure(socketio())

  // Configure other middleware (see `middleware/index.js`)
  .configure(middleware)
  // Set up our services (see `services/index.js`)
  .configure(services)
  // Set up event channels (see channels.js)
  .configure(channels)

  // Configure a middleware for 404s and the error handler
  .use(express.notFound())
  .use(express.errorHandler())

  .hooks(appHooks);

module.exports = app;
