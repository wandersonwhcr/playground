const fastify = require('fastify')({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: false,
      useDefaults: false,
      coerceTypes: false,
      allErrors: true,
      nullable: false,
    },
  },
});

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGO_URL,
  name: 'games',
});

fastify.addSchema(require('./schemas/v1/games.json'));

fastify.register(require('./routes/v1/games.js'));

fastify.setErrorHandler(async function ErrorHandler(error, request, reply) {
  // Logging
  console.error(error);

  if (error.constructor.name === 'MongoError') {
    // Erro do MongoDB
    // Código?
    switch (error.code) {
      case 11000:
        // Conflict
        reply.code(409);
        break;
    }
  } else if (error.validation) {
    // Erro de Validação
    reply.code(422);
    reply.body = error.validation;
  }

  // Apresentação
  reply.send(reply.body); // Padrão: undefined
});

module.exports = fastify;
