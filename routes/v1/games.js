const httpErrors = require('http-errors');

module.exports = function routes(fastify, options, done) {
  // Pesquisar
  fastify.route({
    method: 'GET',
    url: '/v1/games',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            $ref: '/v1/games',
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
    url: '/v1/games',
    schema: {
      body: {
        $ref: '/v1/games',
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
    url: '/v1/games/:gameId',
    schema: {
      params: {
        gameId: {
          $ref: '/v1/games#_id',
        },
      },
    },
    handler: async function GamesDelete(request, reply) {
      // Remover
      const result = await this.mongo.games.db
        .collection('games')
        .deleteOne({ _id: request.params.gameId });
      // Sucesso?
      if (!result.deletedCount) {
        throw new httpErrors.NotFound();
      }
      // Configuração
      reply.code(204);
      // Apresentação
      return '';
    },
  });

  // Feito!
  done();
};
