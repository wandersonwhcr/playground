const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGO_URL,
  name: 'games',
});

fastify.addSchema(require('./schemas/v1/games'));

fastify.register(require('./routes/v1/games'));

fastify.setErrorHandler(async function ErrorHandler(error, request, reply) {
  // Código?
  switch (error.code) {
    case 11000:
      // Conflict
      reply.code(409);
      break;
  }
  // Apresentação
  reply.send();
});

module.exports = fastify;
