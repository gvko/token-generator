'use strict';

const express = require('express');
const router = express.Router();
const TokenService = require('../services/TokenService');

const ENVIRONMENTS = ['local', 'staging', 'production'];

router.post('/', (req, res, next) => {
  const customerId = req.body.customerId;
  const userId = req.body.userId;
  const environment = req.body.environment;
  const expiresIn = req.body.expirationInHours;

  if(!customerId || typeof customerId !== 'number')
    return res.json(new Error('"customerId" is mandatory and must be a number'));

  if(!userId || typeof userId !== 'number')
    return res.json(new Error('"userId" is mandatory and must be a number'));

  if(!expiresIn || typeof expiresIn !== 'number')
    return res.json(new Error('"expiresInHours" is mandatory and must be a number'));

  if(!environment || !ENVIRONMENTS.includes(environment))
    return res.json(new Error(`"environment" is mandatory and must be one of ${ENVIRONMENTS}`));

  const payload = {
    customerId: req.body.customerId,
    userId: req.body.userId
  };

  const options = {
    expiresIn: req.body.expiresInHours
  };

  const token = TokenService.generate(payload, options, 'development');

  return res.json(token);
});

module.exports = router;
