const mongoose = require('mongoose');

const attendantSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true },
    staffId: { type: String, unique: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('Attendant', attendantSchema);
