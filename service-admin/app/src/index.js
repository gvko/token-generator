/* eslint-disable no-console */
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);


server.on('listening', () =>
  console.log(`Server started on http://${app.get('host')}:${port}`)
);
