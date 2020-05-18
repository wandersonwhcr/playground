const uuid = require('uuid');

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

  // Feito!
  done();
};
