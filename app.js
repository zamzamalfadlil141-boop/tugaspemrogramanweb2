const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// Simulasi Database (In-Memory Array)
let books = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata" },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer" }
];

// ==========================================
// ROUTES CRUD
// ==========================================

// 1. READ ALL (GET Semua Data)
app.get('/api/books', (req, res) => {
    res.status(200).json({
        message: "Berhasil mengambil semua buku",
        data: books
    });
});

// 2. READ ONE (GET Satuan berdasarkan ID)
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.status(200).json({
        message: "Berhasil mengambil data buku",
        data: book
    });
});

// 3. CREATE (POST Data Baru)
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1, // Auto-increment ID sederhana
        title: title,
        author: author
    };

    books.push(newBook);
    
    res.status(201).json({
        message: "Buku berhasil ditambahkan",
        data: newBook
    });
});

// 4. UPDATE (PUT / Ubah Data berdasarkan ID)
app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    // Update data
    books[bookIndex] = { id: bookId, title, author };

    res.status(200).json({
        message: "Buku berhasil diperbarui",
        data: books[bookIndex]
    });
});

// 5. DELETE (Hapus Data berdasarkan ID)
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    // Hapus dari array
    const deletedBook = books.splice(bookIndex, 1);

    res.status(200).json({
        message: "Buku berhasil dihapus",
        data: deletedBook[0]
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
