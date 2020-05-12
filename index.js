const fastify = require('fastify')({ logger: true });

fastify.get('/', async (req, rep) => {
  return {
    name: '@wandersonwhcr/playground',
    version: '1.0.0-alpha',
  };
});

fastify.register(require('./routes/v1/games'), { prefix: 'v1' });

module.exports = fastify;
