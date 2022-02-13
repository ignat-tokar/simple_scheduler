const {Schema, model} = require('mongoose');

const schema = Schema({
  listId: {type: String},
  taskTitle: {type: String}
});

module.exports = model('Task', schema);