const express = require('express');
const router  = express.Router();
const {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require('../controllers/bookController');

router.post('/',          createBook);
router.get('/',           getAllBooks);
router.get('/:id',        getBook);
router.put('/:id',        updateBook);
router.delete('/:id',     deleteBook);

// Borrow & Return
router.post('/:id/borrow', borrowBook);
router.post('/:id/return', returnBook);

module.exports = router;
