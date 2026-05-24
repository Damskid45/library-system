const Book    = require('../models/Book');
const Student  = require('../models/Student');
const Attendant = require('../models/Attendant');

// POST /books
exports.createBook = async (req, res) => {
  try {
    // authors array (with author IDs) must be provided
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('authors');
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /books/:id
// Special requirement: if book is OUT, include student, attendant & returnDate details
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('authors');

    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /books/:id/borrow
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    // Rule: book must be IN before borrowing
    if (book.status !== 'IN') {
      return res.status(400).json({ success: false, message: 'Book is already borrowed (OUT)' });
    }

    const { studentId, attendantId, returnDate } = req.body;

    // Validate student and attendant exist
    const student  = await Student.findById(studentId);
    const attendant = await Attendant.findById(attendantId);

    if (!student)  return res.status(404).json({ success: false, message: 'Student not found' });
    if (!attendant) return res.status(404).json({ success: false, message: 'Attendant not found' });

    // Update book fields
    book.status     = 'OUT';
    book.borrowedBy = studentId;
    book.issuedBy   = attendantId;
    book.returnDate = returnDate ? new Date(returnDate) : null;

    await book.save();

    const updatedBook = await Book.findById(book._id)
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    res.json({ success: true, message: 'Book borrowed successfully', data: updatedBook });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /books/:id/return
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    // Rule: book must be OUT before it can be returned
    if (book.status !== 'OUT') {
      return res.status(400).json({ success: false, message: 'Book is already IN the library' });
    }

    // Reset all borrowing fields
    book.status     = 'IN';
    book.borrowedBy = null;
    book.issuedBy   = null;
    book.returnDate = null;

    await book.save();

    res.json({ success: true, message: 'Book returned successfully', data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
