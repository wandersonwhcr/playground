const server = require('.');

server.listen(process.env.PORT, '0.0.0.0')
  .catch((error) => {
    // Problema Encontrado!
    console.error(error);
    // Finalização
    process.exit(255);
  });
