// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

// This code imports Express and creates the API application.
const express = require('express');
const app = express();

// This code allows the API to receive JSON data.
app.use(express.json());

// This code sets the port for the API server.
const port = 3000;

// This route returns all books in the bookstore.
app.get('/api/books', (req, res) => {
    res.json(books);
});

// This route returns one book using its ID.
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
});

// This route adds a new book to the bookstore.
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        copiesAvailable: req.body.copiesAvailable
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// This route updates an existing book using its ID.
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.copiesAvailable = req.body.copiesAvailable;

    res.json(book);
});

// This route deletes an existing book using its ID.
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: 'Book deleted successfully',
        book: deletedBook[0]
    });
});

// This code starts the server when this file is run directly.
if (require.main === module) {
    app.listen(port, () => {
        console.log(`API server running at http://localhost:${port}`);
    });
}

// This code makes the app available for automated testing.
module.exports = app;

