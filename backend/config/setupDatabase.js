const categories = require('./categories.json');
const questions = require('./questions.json');

const { sequelize, Question, Category } = require('../models');

const initDatabase = async () => {
  await sequelize.sync({ force: true });
  await Category.bulkCreate(categories);

  await Question.bulkCreate(questions);
};

module.exports = { initDatabase };
