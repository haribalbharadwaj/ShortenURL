const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true, unique: true },
  shortId: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: null },
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
