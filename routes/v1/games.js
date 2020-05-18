const httpErrors = require('http-errors');
const uuid = require('uuid');

module.exports = function routes(fastify, options, done) {
  // Pesquisar
  fastify.route({
    method: 'GET',
    url: '/v1/games',
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
      // Identificador
      const identifier = { _id: uuid.v4() };
      // Configuração
      const data = Object.assign({}, identifier, request.body);
      // Inserir
      const result = await this.mongo.games.db
        .collection('games')
        .insertOne(data);
      // Configuração
      reply.code(201);
      // Apresentação
      return identifier;
    },
  });

  // Atualizar
  fastify.route({
    method: 'PUT',
    url: '/v1/games/:gameId',
    schema: {
      params: {
        gameId: {
          $ref: '/v1/id',
        },
      },
      body: {
        $ref: '/v1/games',
      },
    },
    handler: async function GamesUpdate(request, reply) {
      // Atualizar
      const result = await this.mongo.games.db
        .collection('games')
        .updateOne({ _id: request.params.gameId }, { $set: request.body });
      // Sucesso?
      if (!result.matchedCount) {
        throw new httpErrors.NotFound();
      }
      // Configuração
      reply.code(204);
      // Apresentação
      return '';
    },
  });

  // Remover
  fastify.route({
    method: 'DELETE',
    url: '/v1/games/:gameId',
    schema: {
      params: {
        gameId: {
          $ref: '/v1/id',
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
