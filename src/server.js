require('dotenv').config(); // Memuat konfigurasi dari .env

const hapi = require('@hapi/hapi');
const booksRoutes = require('./routes/routes'); // Pastikan ini sudah ada

const server = hapi.server({
  port: process.env.PORT || 9000, // Menggunakan PORT dari .env atau 9000 sebagai fallback
  host: 'localhost',
});

// Route untuk root
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Welcome to the Bookshelf API!';
  },
});

// Pastikan route untuk /books sudah ada
server.route(booksRoutes);

server.start().then(() => {
  console.log(`Server running at: ${server.info.uri}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
