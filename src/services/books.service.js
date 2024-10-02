const booksData = require('../data/books');
const { nanoid } = require('nanoid');

class BooksService {
  #books = booksData;

  getAll(query = {}) {
    const { name, reading, finished } = query;
    let books;

    if (typeof name === 'string') {
      books = this._filterByName(name);
    } else if (typeof reading === 'number') {
      books = this._filterByReading(reading);
    } else if (typeof finished === 'number') {
      books = this._filterByFinished(finished);
    } else {
      books = this.#books;
    }

    const formatData = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));
    return {
      success: 200,
      data: {
        books: formatData,
      },
    };
  }

  _filterByName(queryName) {
    return this.#books.filter((item) => {
      const itemName = item.name.toLowerCase();
      const filterName = queryName.toLowerCase();

      return itemName.includes(filterName);
    });
  }

  _filterByReading(queryReading) {
    const filterReading = !!queryReading;
    return this.#books.filter((item) => item.reading === filterReading);
  }

  _filterByFinished(queryFinished) {
    const filterFinished = !!queryFinished;
    return this.#books.filter((item) => item.finished === filterFinished);
  }

  getById(bookId) {
    const findBook = this.#books.find((item) => item.id === bookId);

    if (!findBook) {
      return {
        failed: 404,
        message: 'Buku tidak ditemukan',
      };
    }

    return {
      success: 200,
      data: {
        book: findBook,
      },
    };
  }

  create(payload) {
    const { readPage, pageCount } = payload;

    if (readPage > pageCount) {
      return {
        failed: 400,
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
      success: 201,
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newData.id,
      },
    };
  }

  update(bookId, payload) {
    const { readPage, pageCount } = payload;

    if (readPage > pageCount) {
      return {
        failed: 400,
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      };
    }

    const findIndex = this.#books.findIndex((item) => item.id === bookId);
    if (findIndex === -1) {
      return {
        failed: 404,
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      };
    }

    const updatedAt = new Date().toISOString();
    this.#books[findIndex] = {
      ...this.#books[findIndex],
      ...payload,
      updatedAt,
    };

    return {
      success: 200,
      message: 'Buku berhasil diperbarui',
    };
  }

  delete(bookId) {
    const findIndex = this.#books.findIndex((item) => item.id === bookId);
    if (findIndex === -1) {
      return {
        failed: 404,
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      };
    }

    this.#books.splice(findIndex, 1);

    return {
      success: 200,
      message: 'Buku berhasil dihapus',
    };
  }
}

module.exports = BooksService;
