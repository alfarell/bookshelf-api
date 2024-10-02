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

  getById(bookId) {
    const findBook = this.#books.find((item) => item.id === bookId);

    if (!findBook) {
      return {
        isSuccess: false,
        message: 'Buku tidak ditemukan',
      };
    }

    return {
      isSuccess: true,
      data: findBook,
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

  update(bookId, payload) {
    const { readPage, pageCount } = payload;

    if (readPage > pageCount) {
      return {
        isSuccess: false,
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      };
    }

    const findIndex = this.#books.findIndex((item) => item.id === bookId);
    if (findIndex === -1) {
      return {
        isSuccess: false,
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
      isSuccess: true,
      message: 'Buku berhasil diperbarui',
    };
  }

  delete(bookId) {
    const findIndex = this.#books.findIndex((item) => item.id === bookId);
    if (findIndex === -1) {
      return {
        isSuccess: false,
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      };
    }

    this.#books.splice(findIndex, 1);

    return {
      isSuccess: true,
      message: 'Buku berhasil dihapus',
    };
  }
}

module.exports = BooksService;
