const uuid = require('uuid');
const httpErrors = require('http-errors');

module.exports = function publishers(fastify, options, done) {
  // Pesquisar
  fastify.route({
    method: 'GET',
    url: '/v1/publishers',
    handler: async function PublishersFetch(request, reply) {
      return this.mongo.games.db
        .collection('publishers')
        .find()
        .toArray();
    },
  });

  // Adicionar
  fastify.route({
    method: 'POST',
    url: '/v1/publishers',
    schema: {
      body: {
        $ref: '/v1/publishers',
      },
    },
    handler: async function PublishersInsert(request, reply) {
      // Identificador
      const identifier = { _id: uuid.v4() };
      // Configuração
      const data = Object.assign({}, identifier, request.body);
      // Inserir
      const result = await this.mongo.games.db
        .collection('publishers')
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
    url: '/v1/publishers/:publisherId',
    schema: {
      params: {
        publisherId: {
          $ref: '/v1/id',
        },
      },
      body: {
        $ref: '/v1/publishers',
      },
    },
    handler: async function PublishersUpdate(request, reply) {
      // Atualização
      const result = await this.mongo.games.db
        .collection('publishers')
        .updateOne({ _id: request.params.publisherId }, { $set: request.body });
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
    url: '/v1/publishers/:publisherId',
    schema: {
      params: {
        publisherId: {
          $ref: '/v1/id',
        },
      },
    },
    handler: async function PublishersInsert(request, reply) {
      // Atualização
      const result = await this.mongo.games.db
        .collection('publishers')
        .deleteOne({ _id: request.params.publisherId });
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
