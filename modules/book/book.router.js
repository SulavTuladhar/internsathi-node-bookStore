const router = require('express').Router();
const bookController = require('./book.controller');

router.route('/')
    .get(bookController.getBook)
    .post(bookController.createBook)

router.route('/:id')
    .get(bookController.getSingleBook)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook)

module.exports = router;