const Author = require('../models/Author');

// POST /authors
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({ success: true, data: author });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json({ success: true, count: authors.length, data: authors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /authors/:id
exports.getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
    res.json({ success: true, data: author });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /authors/:id
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
    res.json({ success: true, data: author });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
    res.json({ success: true, message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
