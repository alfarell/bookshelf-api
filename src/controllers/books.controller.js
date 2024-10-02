const Joi = require('@hapi/joi');
const BooksService = require('../services/books.service');
const CreateResponse = require('../utils/createResponse');

const booksService = new BooksService();

class BooksController {
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
}

class BooksSchema {
  static get baseSchema() {
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
            'string.base': `Gagal menambahkan buku. Isi ${curr.nameLabel} buku harus berupa huruf`,
            'string.empty': `Gagal menambahkan buku. Mohon isi ${curr.nameLabel} buku`,
            'any.required': `Gagal menambahkan buku. Properti ${curr.nameLabel} buku harus disertakan`,
          }),
        number: Joi.number()
          .integer()
          .min(0)
          .required()
          .messages({
            'number.base': `Gagal menambahkan buku. Isi ${curr.nameLabel} buku harus berupa angka`,
            'any.required': `Gagal menambahkan buku. Properti ${curr.nameLabel} buku harus disertakan`,
          }),
        boolean: Joi.boolean()
          .required()
          .messages({
            'boolean.base': `Gagal menambahkan buku. Isi ${curr.nameLabel} buku harus berupa boolean`,
            'any.required': `Gagal menambahkan buku. Properti ${curr.nameLabel} buku harus disertakan`,
          }),
      };
      return { ...acc, [curr.name]: validateTypes[curr.type] };
    }, {});

    return schema;
  }

  static get create() {
    return Joi.object(this.baseSchema);
  }
}

module.exports = { BooksController, BooksSchema };
