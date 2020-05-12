const fastify = require('fastify');

const server = fastify({ logger: true });

server.get('/', async (req, rep) => {
  return {
    name: '@wandersonwhcr/playground',
    version: '1.0.0-alpha',
  };
});

module.exports = server;
