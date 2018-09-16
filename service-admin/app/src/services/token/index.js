'use strict';

import * as hooks from 'hooks';

export class Token {
  constructor(app) {
    this.app = app;
  }

  async create(data, params) {

  }
}

export default function () {
  const app = this;

  app.use('/tokens', new Token(app));
  app.service('/tokens').hooks({
    before: hooks.before,
    after: hooks.after,
    error: hooks.error
  });
}
