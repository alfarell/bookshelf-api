const booksRoute = [
  {
    method: 'GET',
    path: '/books',
    handler: () => {
      return 'Book list';
    },
  },
];

module.exports = booksRoute;
