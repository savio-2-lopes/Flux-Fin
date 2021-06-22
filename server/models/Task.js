const { Schema, model } = require('mongoose');


const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'cards',
  },],

  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Task = model('task', TaskSchema);