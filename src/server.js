const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const port = process.env.PORT || 9000;

const init = async () => {
  const server = Hapi.server({
    host,
    port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    router: {
      stripTrailingSlash: true,
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
