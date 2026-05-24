const express = require('express');
const router  = express.Router();
const {
  createAttendant,
  getAllAttendants,
} = require('../controllers/attendantController');

router.post('/', createAttendant);
router.get('/',  getAllAttendants);

module.exports = router;
