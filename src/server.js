const Hapi = require('@hapi/hapi');

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const port = process.env.PORT || 3000;

const init = async () => {
  const server = Hapi.server({
    host,
    port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route();

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
