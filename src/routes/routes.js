const bookController = require('../controllers/book_controller');

const routes = [
    { method: 'POST', path: '/books', handler: bookController.addBook },
    { method: 'GET', path: '/books', handler: bookController.getAllBooks },
    { method: 'GET', path: '/books/{bookId}', handler: bookController.getBookById },
    { method: 'PUT', path: '/books/{bookId}', handler: bookController.updateBook },
    { method: 'DELETE', path: '/books/{bookId}', handler: bookController.deleteBook },
];

module.exports = routes;
