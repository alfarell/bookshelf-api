const BooksController = require('../controllers/books.controller');
const BooksSchema = require('../schemas/books.schema');
const failAction = require('../utils/failActionHandler');

const booksRoute = [
  {
    method: 'GET',
    path: '/books',
    handler: BooksController.show,
    options: {
      validate: {
        ...BooksSchema.show,
        failAction,
      },
    },
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: BooksController.showById,
  },
  {
    method: 'POST',
    path: '/books',
    handler: BooksController.create,
    options: {
      validate: {
        ...BooksSchema.create,
        failAction,
      },
    },
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: BooksController.update,
    options: {
      validate: {
        ...BooksSchema.update,
        failAction,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: BooksController.delete,
    options: {
      validate: {
        ...BooksSchema.delete,
        failAction,
      },
    },
  },
];

module.exports = booksRoute;
