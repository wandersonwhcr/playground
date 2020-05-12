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
      const games = await this.mongo.games.db
        .collection('games')
        .find()
        .toArray();

      return games;
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
        },
      },
      body: {
        type: 'object',
        required: ['name'],
        additionalProperties: false,
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
          },
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
      // Identificador
      const identifier = { _id: request.params.gameId };
      // Inicialização
      const game = Object.assign({}, identifier, request.body);
      // Inserir
      await this.mongo.games.db
        .collection('games')
        .insert(game);
      // Apresentação
      return identifier;
    },
  });

  // Feito!
  done();
};
