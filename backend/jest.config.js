module.exports = {
  testEnvironment: 'node',
  globalTeardown: './test-teardown-globals.js', // used for force quitting express server after tests
};
