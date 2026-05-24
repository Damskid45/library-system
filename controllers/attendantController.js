const Attendant = require('../models/Attendant');

// POST /attendants
exports.createAttendant = async (req, res) => {
  try {
    const attendant = await Attendant.create(req.body);
    res.status(201).json({ success: true, data: attendant });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /attendants
exports.getAllAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();
    res.json({ success: true, count: attendants.length, data: attendants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
