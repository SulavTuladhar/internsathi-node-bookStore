const bookModel = require('../../models/book.model');

/**
 * It creates a custom error object with a message and a status code.
 * @param errorMsg - The error message you want to display.
 * @param status - The HTTP status code of the error.
 * @returns an error object with a message and a status.
 */
function customError(errorMsg, status) {
    const error = new Error(errorMsg);
    error.status = status;
    return error;
}

/**
 * If the bookData has a name, set the book's name to the bookData's name, and so on.
 * @param book - The book object that you want to update.
 * @param bookData - The data that is sent from the client.
 * @returns The book object is being returned.
 */
function map_book_req(book,bookData){
    if(bookData.name)
        book.name = bookData.name;
    if(bookData.price)
        book.price = bookData.price;
    if(bookData.description)
        book.description = bookData.description;
    return book;
}


/* A function that is used to escape special characters in a string. */
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


const getBook = async (req,res,next) => {
    try{
        var books;
        if(req.query.search){
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            books = await bookModel.find({name: regex});
        }else{
            books = await bookModel.find();
        }
        if(!books){
            throw new customError('Books not Found', 404)
        }
        // If books exists
        res.status(200).json({
            data: books
        })
    }catch(err){
        return next(err)
    }
}

const getSingleBook = async (req,res,next) => {
    try{
        const book = await bookModel.findById(req.params.id)
        if(!book){
            throw new customError('Book not found', 404);
        }
        res.status(200).json(book)
    }catch(err){
        return next(err)
    }
}

const createBook = async (req,res,next) => {
    try{
        const data = req.body;
        const newBook = new bookModel({});
        map_book_req(newBook, data);
        const saved = await newBook.save();
        res.status(200).json(saved);
    }catch(err){
        return next(err)
    }
}

const updateBook = async (req,res,next) => {
    try{
        const data = req.body;
        var book = await bookModel.findById(req.params.id);
        if(!book){
            throw new customError('Book not Found', 404)
        }
        map_book_req(book, data);
        const updatedBook = await book.save();
        res.status(200).json(updatedBook)
    }catch(err){
        return next(err)
    }
}

const deleteBook = async (req,res,next) => {
    try{
        const book = await bookModel.findById(req.params.id)
        if(!book){
            throw new customError('Book not found', 404)
        }
        // Book found
        const removed = await book.remove();
        res.status(200).json({removed})

    }catch(err){
        return next(err)
    }
}

module.exports = {
    getBook,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
}