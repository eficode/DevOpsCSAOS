const express = require('express');
const path = require('path');
const { Category, Question } = require('./models');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/out')));

// list all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.findAll();
    return res.json(questions);
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch questions' });
  }
});
// list all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch answers' });
  }
});

// get question by id
app.get('/api/question/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({
      where: { id },
    });
    return res.json(question);
  } catch (e) {
    return res.status(500).json({ error: 'That uuid does not exist' });
  }
});

// get all questions in category
app.get('/api/category/:CategoryId', async (req, res) => {
  const { CategoryId } = req.params;
  try {
    const questions = await Question.findAll({
      where: { CategoryId },
    });
    return res.json(questions);
  } catch (e) {
    return res.status(500).json({ error: 'That uuid does not exist' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});



module.exports = app;
