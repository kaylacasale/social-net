//* installed mongoose email validator npm package by entering into the command-line: 'npm i mongoose-type-email'
// in order to validate correct email in User model
// https://www.npmjs.com/package/mongoose-type-email

// require User and Thought models
const User = require('./User');
const Thought = require('./Thought');

module.exports = { User, Thought };