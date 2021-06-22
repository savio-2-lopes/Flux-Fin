const { Schema, model } = require('mongoose');


const KambamSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'tasks',
  },],

  activity: [{
    text: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },],

  members: [{
    _id: false,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    name: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: 'admin',
    },
  },],
},
  { timestamps: true, }
);

module.exports = Kambam = model('kambam', KambamSchema);