const BooksService = require('../services/books.service');
const CreateResponse = require('../utils/createResponse');

const booksService = new BooksService();

class BooksController {
  static show(request, h) {
    const { query } = request;

    const getBooks = booksService.getAll(query);

    const createResponse = new CreateResponse('', getBooks.data).success();
    const response = h
      .response(createResponse.payload)
      .code(createResponse.code);

    return response;
  }

  static showById(request, h) {
    const { params } = request;

    const getBook = booksService.getById(params.bookId);

    let createResponse;
    if (getBook.isSuccess) {
      createResponse = new CreateResponse(
        getBook.message,
        getBook.data,
      ).success();
    } else {
      createResponse = new CreateResponse(getBook.message).failed();
    }

    const response = h
      .response(createResponse.payload)
      .code(createResponse.code);

    return response;
  }

  static create(request, h) {
    const { payload } = request;

    const addBook = booksService.create(payload);

    let createResponse;
    if (addBook.isSuccess) {
      createResponse = new CreateResponse(
        addBook.message,
        addBook.data,
      ).success();
    } else {
      createResponse = new CreateResponse(addBook.message).failed();
    }

    const response = h
      .response(createResponse.payload)
      .code(createResponse.code);

    return response;
  }

  static update(request, h) {
    const { params, payload } = request;

    const updateBook = booksService.update(params.bookId, payload);

    let createResponse;
    if (updateBook.isSuccess) {
      createResponse = new CreateResponse(
        updateBook.message,
        updateBook.data,
      ).success();
    } else {
      createResponse = new CreateResponse(updateBook.message).failed();
    }

    const response = h
      .response(createResponse.payload)
      .code(createResponse.code);

    return response;
  }

  static delete(request, h) {
    const { params } = request;

    const updateBook = booksService.delete(params.bookId);

    let createResponse;
    if (updateBook.isSuccess) {
      createResponse = new CreateResponse(
        updateBook.message,
        updateBook.data,
      ).success();
    } else {
      createResponse = new CreateResponse(updateBook.message).failed();
    }

    const response = h
      .response(createResponse.payload)
      .code(createResponse.code);

    return response;
  }
}

module.exports = BooksController;
