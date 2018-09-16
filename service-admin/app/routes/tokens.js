'use strict';

const express = require('express');
const router = express.Router();
const TokenService = require('../services/TokenService');

router.post('/', (req, res, next) => {
  const payload = {
    customerId: req.body.customerId,
    userId: req.body.userId
  };

  const options = {
    expiresIn: req.body.expiresInHours
  };

  const token = TokenService.generate(payload, options, 'development');

  res.json(token);
});

module.exports = router;
