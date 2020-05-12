const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGO_URL,
  name: 'games',
});

fastify.addSchema(require('./schemas/v1/games'));

fastify.register(require('./routes/v1/games'));

module.exports = fastify;
