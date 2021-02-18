/**
 * Mock data server.
 * The purpose of using this file is to avoid json-server installed globally.
 * We are using all the defaults settings.
 */

// Libraries
const jsonServer = require('json-server');

// Instance
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

// Setup
server.use(middlewares);
server.use(router);

// Start
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001.');
});