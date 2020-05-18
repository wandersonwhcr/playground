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
  // Feito!
  done();
};
