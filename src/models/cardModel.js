const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  attribute: { type: String },
  world: { type: String },
  number: { type: String },
  set: { type: String },
  description: { type: String },
  iconUrl: { type: String },
  lang: { type: String, default: 'pt' }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
