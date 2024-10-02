const {
  BooksController,
  BooksSchema,
} = require('../controllers/books.controller');
const failAction = require('../utils/failActionHandler');

const booksRoute = [
  {
    method: 'GET',
    path: '/books',
    handler: () => {
      return 'Book list';
    },
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
