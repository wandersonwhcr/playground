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
    handler: async function ToysFetch(request, reply) {
      return [
        {
          "name": "Chrono Trigger",
        },
      ];
    },
  });

  // Feito!
  done();
};
