const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true },
    email:     { type: String, unique: true },
    studentId: { type: String, unique: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('Student', studentSchema);
