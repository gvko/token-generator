'use strict';

const express = require('express');
const router = express.Router();
const TokenService = require('../services/TokenService');

const ENVIRONMENTS = ['local', 'develop', 'staging', 'production'];

router.post('/', (req, res, next) => {
  const customerId = parseInt(req.body.customerId);
  const userId = parseInt(req.body.userId);
  const environment = req.body.environment;
  const expiresIn = parseInt(req.body.expirationInHours);

  const err = new Error();
  if (!customerId || typeof customerId !== 'number') {
    err.message = '"customerId" is mandatory and must be a number';
    err.code = 400;
    return res.status(400).json({ err });
  }

  if (!userId || typeof userId !== 'number') {
    err.message = '"userId" is mandatory and must be a number';
    err.code = 400;
    return res.status(400).json({ err });
  }

  if (!expiresIn || typeof expiresIn !== 'number') {
    err.message = '"expiresInHours" is mandatory and must be a number';
    err.code = 400;
    return res.status(400).json({ err });
  }

  if (!environment || !ENVIRONMENTS.includes(environment)) {
    err.message = `"environment" is mandatory and must be one of ${ENVIRONMENTS}`;
    err.code = 400;
    return res.status(400).json({ err });
  }

  const payload = {
    customerId,
    userId
  };

  const options = {
    expiresIn
  };

  const token = TokenService.generate(payload, options, 'development');

  res.status(200).json(token);
});

module.exports = router;
