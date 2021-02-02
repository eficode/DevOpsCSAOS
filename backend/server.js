const app = require('./app');

const { initDatabase } = require('./config/setupDatabase');

const port = process.env.PORT || 5000;

(async () => {
  await initDatabase();
  console.log('Database initialized');
  app.listen({ port }, async () => {
    console.log(`'Server up on http://localhost:${port}`);
  });
})();
