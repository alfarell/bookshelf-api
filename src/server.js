const Hapi = require('@hapi/hapi');
const routes = require('./routes');

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

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
