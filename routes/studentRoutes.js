const express = require('express');
const router  = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudent,
} = require('../controllers/studentController');

router.post('/',   createStudent);
router.get('/',    getAllStudents);
router.get('/:id', getStudent);

module.exports = router;
