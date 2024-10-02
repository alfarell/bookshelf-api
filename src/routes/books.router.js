const {
  BooksController,
  BooksSchema,
} = require('../controllers/books.controller');
const failAction = require('../utils/failActionHandler');

const booksRoute = [
  {
    method: 'GET',
    path: '/books',
    handler: BooksController.show,
    options: {
      validate: {
        query: BooksSchema.show,
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
        payload: BooksSchema.create,
        failAction,
      },
    },
  },
];

module.exports = booksRoute;
