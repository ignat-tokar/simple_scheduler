const {Schema, model} = require('mongoose');

const schema = Schema({
  listTitle: {type: String}
});

module.exports = model('List', schema);