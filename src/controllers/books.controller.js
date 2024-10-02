const Joi = require('@hapi/joi');
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

class BooksSchema {
  static basePayloadSchema(state) {
    const properties = [
      {
        name: 'name',
        nameLabel: 'nama',
        type: 'string',
      },
      {
        name: 'year',
        nameLabel: 'tahun',
        type: 'number',
      },
      {
        name: 'author',
        nameLabel: 'pengarang',
        type: 'string',
      },
      {
        name: 'summary',
        nameLabel: 'ringkasan',
        type: 'string',
      },
      {
        name: 'publisher',
        nameLabel: 'penerbit',
        type: 'string',
      },
      {
        name: 'pageCount',
        nameLabel: 'pageCount',
        type: 'number',
      },
      {
        name: 'readPage',
        nameLabel: 'readPage',
        type: 'number',
      },
      {
        name: 'reading',
        nameLabel: 'reading',
        type: 'boolean',
      },
    ];
    const schema = properties.reduce((acc, curr) => {
      const validateTypes = {
        string: Joi.string()
          .min(1)
          .required()
          .messages({
            'string.base': `Gagal ${state} buku. Isi ${curr.nameLabel} buku harus berupa huruf`,
            'string.empty': `Gagal ${state} buku. Mohon isi ${curr.nameLabel} buku`,
            'any.required': `Gagal ${state} buku. Properti ${curr.nameLabel} buku harus disertakan`,
          }),
        number: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            'number.base': `Gagal ${state} buku. Isi ${curr.nameLabel} buku harus berupa angka`,
            'any.required': `Gagal ${state} buku. Properti ${curr.nameLabel} buku harus disertakan`,
          }),
        boolean: Joi.boolean()
          .required()
          .messages({
            'boolean.base': `Gagal ${state} buku. Isi ${curr.nameLabel} buku harus berupa boolean`,
            'any.required': `Gagal ${state} buku. Properti ${curr.nameLabel} buku harus disertakan`,
          }),
      };
      return { ...acc, [curr.name]: validateTypes[curr.type] };
    }, {});

    return schema;
  }

  static get show() {
    return Joi.object({
      name: Joi.string().min(1).optional().messages({
        'string.base': `Gagal mendapatkan buku. Isi query nama buku harus berupa huruf`,
        'string.empty': `Gagal mendapatkan buku. Mohon isi nama buku`,
      }),
      finished: Joi.number().integer().min(1).optional().messages({
        'number.base': `Gagal mendapatkan buku. Isi query finished buku harus berupa angka 0 atau 1`,
        'number.empty': `Gagal mendapatkan buku. Mohon isi finished buku`,
      }),
      reading: Joi.number().integer().min(1).optional().messages({
        'number.base': `Gagal mendapatkan buku. Isi query reading buku harus berupa angka 0 atau 1`,
        'number.empty': `Gagal mendapatkan buku. Mohon isi reading buku`,
      }),
    });
  }

  static get create() {
    return Joi.object(this.basePayloadSchema('menambahkan'));
  }

  static get update() {
    return {
      params: Joi.object({
        bookId: Joi.string().min(1).not(':bookId').required().messages({
          'string.empty': `Gagal memperbarui buku. Mohon isi params bookId`,
          'any.invalid': `Gagal memperbarui buku. Mohon isi params bookId`,
        }),
      }),
      payload: Joi.object(this.basePayloadSchema('memperbarui')),
    };
  }

  static get delete() {
    return {
      params: Joi.object({
        bookId: Joi.string().min(1).not(':bookId').required().messages({
          'string.empty': 'Buku gagal dihapus. Mohon isi params bookId',
          'any.invalid': 'Buku gagal dihapus. Mohon isi params bookId',
        }),
      }),
    };
  }
}

module.exports = { BooksController, BooksSchema };
