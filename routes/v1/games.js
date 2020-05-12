module.exports = function routes(fastify, options, done) {
  // Jogo
  fastify.addSchema({
    $id: 'Game',
    type: 'object',
    required: ['_id', 'name'],
    additionalProperties: false,
    properties: {
      _id: {
        type: 'string',
        pattern: '^[0-9a-z]$',
      },
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
    },
  });

  // Pesquisar
  fastify.route({
    method: 'GET',
    url: '/games',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            $ref: 'Game',
          },
        },
      },
    },
    handler: async function GamesFetch(request, reply) {
      return [
        {
          _id: 'abc',
          name: 'Chrono Trigger',
        },
      ];
    },
  });

  // Adicionar
  fastify.route({
    method: 'PUT',
    url: '/games/:gameId',
    schema: {
      params: {
        gameId: {
          type: 'string',
          minLength: 1,
          maxLength: 40,
        },
      },
      response: {
        200: {
          type: 'object',
          required: ['_id'],
          additionalProperties: false,
          properties: {
            _id: {
              type: 'string',
              pattern: '^[0-9a-z]$',
            },
          },
        },
      },
    },
    handler: async function GamesInsert(request, reply) {
      return {
        _id: request.params.gameId,
        name: 'Chrono Trigger',
      };
    },
  });

  // Feito!
  done();
};
