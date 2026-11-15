
const request = require('supertest');
const app = require('../server');

// These tests check the bookstore API endpoints.
describe('Books API Tests', () => {

    // This test gets all books from the bookstore.
    test('GET /api/books should return all books', async () => {
        const response = await request(app).get('/api/books');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    });

    // This test gets one book using its ID.
    test('GET /api/books/1 should return one book', async () => {
        const response = await request(app).get('/api/books/1');

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('The Great Gatsby');
    });

    // This test checks the response when a book does not exist.
    test('GET /api/books/99 should return 404', async () => {
        const response = await request(app).get('/api/books/99');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Book not found');
    });

    // This test adds a new book to the bookstore.
    test('POST /api/books should add a new book', async () => {
        const newBook = {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            genre: 'Fantasy',
            copiesAvailable: 4
        };

        const response = await request(app)
            .post('/api/books')
            .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('The Hobbit');
        expect(response.body.id).toBe(4);
    });

    // This test updates an existing book.
    test('PUT /api/books/1 should update a book', async () => {
        const updatedBook = {
            title: 'The Great Gatsby - Updated',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic Fiction',
            copiesAvailable: 10
        };

        const response = await request(app)
            .put('/api/books/1')
            .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('The Great Gatsby - Updated');
        expect(response.body.copiesAvailable).toBe(10);
    });

    // This test checks updating a book that does not exist.
    test('PUT /api/books/99 should return 404', async () => {
        const response = await request(app)
            .put('/api/books/99')
            .send({
                title: 'Missing Book',
                author: 'Unknown',
                genre: 'Unknown',
                copiesAvailable: 0
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Book not found');
    });

    // This test deletes an existing book.
    test('DELETE /api/books/2 should delete a book', async () => {
        const response = await request(app).delete('/api/books/2');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book deleted successfully');
        expect(response.body.book.id).toBe(2);
    });

    // This test checks deleting a book that does not exist.
    test('DELETE /api/books/99 should return 404', async () => {
        const response = await request(app).delete('/api/books/99');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Book not found');
    });

});
