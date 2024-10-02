const booksData = require('../data/books');
const { nanoid } = require('nanoid');

class BooksService {
  #books = booksData;

  create(payload) {
    const { readPage, pageCount } = payload;

    if (readPage > pageCount) {
      return {
        isSuccess: false,
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      };
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = readPage === pageCount;

    const newData = {
      id,
      ...payload,
      finished,
      insertedAt,
      updatedAt,
    };

    this.#books.push(newData);

    return {
      isSuccess: true,
      message: 'Buku berhasil ditambahkan',
      data: newData,
    };
  }
}

module.exports = BooksService;
