const express = require('express');
const path = require('path');

const { sequelize, Answer } = require('./models');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/out')));

app.post('/api/answers', async (req, res) => {
  const { first, second, third } = req.body;

  try {
    const answer = await Answer.create({ first, second, third });

    return res.json(answer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get('/api/answers', async (req, res) => {
  try {
    const answers = await Answer.findAll();
    return res.json(answers);
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch answers' });
  }
});

app.get('/api/answers/:uuid', async (req, res) => {
  const { uuid } = req.params;
  try {
    const answer = await Answer.findOne({
      where: { uuid },
    });
    return res.json(answer);
  } catch (e) {
    return res.status(500).json({ error: 'That uuid does not exist' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});

app.listen({ port }, async () => {
  console.log(`'Server up on http://localhost:${port}`);
  await sequelize.authenticate();
  console.log('Database connected');
});

module.exports = app;
