# 📚 School Library Management API

A RESTful API built with Node.js, Express.js, and MongoDB (Mongoose) for managing a school library system.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose

---

## Setup Steps

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd library-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/library-system
```

### 4. Start the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5000`

---

## Project Structure

```
/library-system
  /models
    Author.js
    Book.js
    Student.js
    Attendant.js
  /controllers
    authorController.js
    bookController.js
    studentController.js
    attendantController.js
  /routes
    authorRoutes.js
    bookRoutes.js
    studentRoutes.js
    attendantRoutes.js
  /config
    db.js
  server.js
  package.json
  .env.example
  README.md
```

---

## API Documentation

### Authors

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| POST   | /authors          | Create an author   |
| GET    | /authors          | Get all authors    |
| GET    | /authors/:id      | Get single author  |
| PUT    | /authors/:id      | Update author      |
| DELETE | /authors/:id      | Delete author      |

**Create Author — Request Body:**
```json
{
  "name": "Chinua Achebe",
  "bio": "Nigerian novelist and poet"
}
```

---

### Books

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| POST   | /books              | Create book (with author IDs) |
| GET    | /books              | Get all books             |
| GET    | /books/:id          | Get single book (populated) |
| PUT    | /books/:id          | Update book               |
| DELETE | /books/:id          | Delete book               |
| POST   | /books/:id/borrow   | Borrow a book             |
| POST   | /books/:id/return   | Return a book             |

**Create Book — Request Body:**
```json
{
  "title": "Things Fall Apart",
  "isbn": "978-0-385-47454-2",
  "authors": ["<authorId>"]
}
```

**Borrow Book — Request Body:**
```json
{
  "studentId": "<studentId>",
  "attendantId": "<attendantId>",
  "returnDate": "2025-04-01"
}
```

> **Rules:**
> - Book must have status `IN` to be borrowed
> - After borrow: status → `OUT`, `borrowedBy`, `issuedBy`, `returnDate` are set
> - Book must have status `OUT` to be returned
> - After return: status → `IN`, `borrowedBy`, `issuedBy`, `returnDate` are cleared

> **Special:** When fetching a book with status `OUT`, the response includes full Student details, Library Attendant details, and return date (via populate).

---

### Students

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | /students        | Create student     |
| GET    | /students        | Get all students   |
| GET    | /students/:id    | Get single student |

**Create Student — Request Body:**
```json
{
  "name": "Amaka Obi",
  "email": "amaka@school.edu",
  "studentId": "STU001"
}
```

---

### Library Attendants

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | /attendants      | Create attendant      |
| GET    | /attendants      | Get all attendants    |

**Create Attendant — Request Body:**
```json
{
  "name": "Mr. Bello",
  "staffId": "STAFF001"
}
```

---

## Testing with Postman

Import the following base URL into Postman:
```
http://localhost:5000
```

Suggested test flow:
1. Create an Author → copy the `_id`
2. Create a Book → pass the author `_id` in `authors` array
3. Create a Student → copy the `_id`
4. Create an Attendant → copy the `_id`
5. Borrow the book using the Student and Attendant IDs
6. Fetch the book → response includes student & attendant details
7. Return the book → fields reset to null
