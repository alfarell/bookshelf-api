const booksData = require('../data/books');
const { nanoid } = require('nanoid');

class BooksService {
  #books = booksData;

  getAll(query) {
    let books;

    if (query?.name) {
      books = this.#books.filter((item) => {
        const itemName = item.name.toLowerCase();
        const queryName = query.name.toLowerCase();

        return itemName.includes(queryName);
      });
    } else if (query?.reading) {
      books = this.#books.filter(
        (item) => item.reading === !!Number(query?.reading),
      );
    } else if (query?.finished) {
      books = this.#books.filter(
        (item) => item.finished === !!Number(query?.finished),
      );
    } else {
      books = this.#books;
    }

    return {
      isSuccess: true,
      data: books,
    };
  }

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
