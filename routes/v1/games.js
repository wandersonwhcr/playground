module.exports = function routes(fastify, options, done) {
  // Jogo
  fastify.addSchema(require('../../schemas/v1/games.json'));

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
        .insertOne(request.body);
      // Configuração
      reply.code(201);
      // Apresentação
      return { _id: result.insertedId };
    },
  });

  // Remover
  fastify.route({
    method: 'DELETE',
    url: '/games/:gameId',
    schema: {
      params: {
        gameId: {
          $ref: 'playground/games#_id',
        },
      },
    },
    handler: async function GamesDelete(request, reply) {
      // Remover
      await this.mongo.games.db
        .collection('games')
        .deleteOne({ _id: request.params.gameId });
      // Configuração
      reply.code(204);
      // Apresentação
      return '';
    },
  });

  // Feito!
  done();
};
