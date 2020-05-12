module.exports = function routes(fastify, options, done) {
  // Pesquisar
  fastify.route({
    method: 'GET',
    url: '/games',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name'],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
                minLength: 1,
              },
            }
          },
        },
      },
    },
    handler: async function GamesFetch(request, reply) {
      return [
        {
          "name": "Chrono Trigger",
        },
      ];
    },
  });

  // Adicionar
  fastify.route({
    method: 'PUT',
    url: '/games/:gameId',
    schema: {
      response: {
        200: {
          type: 'object',
          required: ['_id'],
          additionalProperties: false,
          properties: {
            _id: {
              type: 'string',
              maxLength: 1,
            },
          },
        },
      },
    },
    handler: async function GamesInsert(request, reply) {
      return { _id: request.params.gameId };
    },
  });

  // Feito!
  done();
};
