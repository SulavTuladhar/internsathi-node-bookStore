const router = require('express').Router();

const BookRouter = require('./modules/book/book.router');

router.use('/book', BookRouter);

module.exports = router;