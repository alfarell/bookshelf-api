const BooksController = require('../controllers/books.controller');
const BooksSchema = require('../schemas/books.schema');
const failAction = require('../utils/failActionHandler');

const booksRoute = [
  {
    method: 'GET',
    path: '/books',
    handler: (request, h) => BooksController.show(request, h),
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
    handler: (request, h) => BooksController.showById(request, h),
  },
  {
    method: 'POST',
    path: '/books',
    handler: (request, h) => BooksController.create(request, h),
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
    handler: (request, h) => BooksController.update(request, h),
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
    handler: (request, h) => BooksController.delete(request, h),
    options: {
      validate: {
        ...BooksSchema.delete,
        failAction,
      },
    },
  },
];

module.exports = booksRoute;
