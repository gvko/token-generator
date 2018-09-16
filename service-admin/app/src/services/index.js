'use strict';

import tokens from './token';

export default function (app) {
  const services = [tokens];

  /*
   * Initialize the services
   */
  for (const service of services) {
    app.configure(service);
  }
};
