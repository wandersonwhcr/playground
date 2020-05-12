module.exports = function routes(fastify, options, done) {
  // Identificador
  fastify.addSchema({
    $id: 'http://wandersonwhcr.github.io/playground/identifier',
    type: 'object',
    required: ['_id'],
    additionalProperties: false,
    properties: {
      _id: {
        $id: '#identifier',
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
    },
  });

  // Jogo
  fastify.addSchema({
    $id: 'http://wandersonwhcr.github.io/playground/games',
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
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
            $ref: 'http://wandersonwhcr.github.io/playground/games',
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
          $ref: 'http://wandersonwhcr.github.io/playground/identifier#identifier',
        },
      },
      body: {
        $ref: 'http://wandersonwhcr.github.io/playground/games',
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
