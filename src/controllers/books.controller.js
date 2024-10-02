const BooksService = require('../services/books.service');
const CreateResponse = require('../utils/createResponse');

const booksService = new BooksService();

class BooksController {
  static show(request, h) {
    const { query } = request;
    const getBooks = booksService.getAll(query);
    const response = this._createResponse(h, getBooks);

    return response;
  }

  static showById(request, h) {
    const { params } = request;
    const getBook = booksService.getById(params.bookId);
    const response = this._createResponse(h, getBook);

    return response;
  }

  static create(request, h) {
    const { payload } = request;
    const addBook = booksService.create(payload);
    const response = this._createResponse(h, addBook);

    return response;
  }

  static update(request, h) {
    const { params, payload } = request;
    const updateBook = booksService.update(params.bookId, payload);
    const response = this._createResponse(h, updateBook);

    return response;
  }

  static delete(request, h) {
    const { params } = request;
    const deleteBook = booksService.delete(params.bookId);
    const response = this._createResponse(h, deleteBook);

    return response;
  }

  static _createResponse(handler, serviceData) {
    const createRes = new CreateResponse(serviceData);
    const getResponse = createRes.getResponse();

    const responseHandler = handler
      .response(getResponse.payload)
      .code(getResponse.code);

    return responseHandler;
  }
}

module.exports = BooksController;
