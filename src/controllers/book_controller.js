let bookIdCounter = 1;

const books = [];

// Add a new book
const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const id = `book-${bookIdCounter++}`;  // Increment the ID counter
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher,
        pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId: id },
    }).code(201);
};

// Get all books
const getAllBooks = (request, h) => {
    const { name, reading, finished } = request.query;

    const filteredBooks = books.filter(book => {
        if (name && !book.name.toLowerCase().includes(name.toLowerCase())) return false;
        if (reading && book.reading !== !!Number(reading)) return false;
        if (finished && book.finished !== !!Number(finished)) return false;
        return true;
    }).map(({ id, name, publisher }) => ({ id, name, publisher }));

    return h.response({
        status: 'success',
        data: { books: filteredBooks },
    });
};

// Get a book by ID
const getBookById = (request, h) => {
    const { bookId } = request.params;
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }

    return h.response({
        status: 'success',
        data: { book },
    });
};

// Update a book by ID
const updateBook = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const book = books.find(b => b.id === bookId);
    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    book.name = name;
    book.year = year;
    book.author = author;
    book.summary = summary;
    book.publisher = publisher;
    book.pageCount = pageCount;
    book.readPage = readPage;
    book.finished = pageCount === readPage;
    book.reading = reading;
    book.updatedAt = new Date().toISOString();

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
};

const deleteBook = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    books.splice(index, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
};

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };