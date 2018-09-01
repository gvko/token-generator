#!/usr/bin/env node

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('app'));

app.get('/ping', (req, res) => {
  res.status(418);
  res.set('Content-Type', 'application/json');
  res.send({
    'message': 'pong',
    'serverTime': now()
  });
});

app.get('/health-check', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({
    'status': 'ok',
    'serverTime': now()
  });
});

app.get('/status', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({
    'status': 'running',
    'hostname': process.env.HOSTNAME,
    'service': 'frontend-server',
    'nodeEnv': process.env.NODE_ENV,
    'environment': process.env.ENVIRONMENT,
    'serverTime': now()
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.listen(port, () => {
  console.log('Server started on port:', port);
});

function now() {
  return Math.floor(new Date().getTime() / 1000);
}
