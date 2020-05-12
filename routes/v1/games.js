module.exports = function routes(fastify, options, done) {
  // Jogo
  fastify.addSchema({
    $id: 'playground/games',
    type: 'object',
    required: ['_id', 'name'],
    additionalProperties: false,
    properties: {
      _id: {
        type: 'string',
        format: 'uuid',
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
            $ref: 'playground/games',
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
    method: 'POST',
    url: '/games',
    schema: {
      body: {
        $ref: 'playground/games',
      },
    },
    handler: async function GamesInsert(request, reply) {
      // Inserir
      const result = await this.mongo.games.db
        .collection('games')
        .insert(request.body);
      // Apresentação
      return { _id: result.insertedIds[0] };
    },
  });

  // Feito!
  done();
};
