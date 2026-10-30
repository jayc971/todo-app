# TODO App - Backend

Express.js REST API for the TODO application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Mongoose schema validation

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB installation)

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Update the `.env` file with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todo-app?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Add your IP address to the IP Access List (or allow access from anywhere for development)
5. Get the connection string and replace `<username>`, `<password>`, and `<cluster>` in your `.env` file

### 4. Run the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all TODO items |
| POST | `/api/todos` | Create a new TODO |
| PUT | `/api/todos/:id` | Update a TODO (title/description) |
| PATCH | `/api/todos/:id/done` | Toggle the done status |
| DELETE | `/api/todos/:id` | Delete a TODO |
| GET | `/health` | Health check endpoint |

## Request/Response Examples

### Create a TODO

```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Build a REST API with Express"
}
```

### Response

```json
{
  "_id": "65abc123...",
  "title": "Learn Express.js",
  "description": "Build a REST API with Express",
  "done": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Assumptions & Limitations

- No authentication/authorization implemented (single user app)
- TODOs are sorted by creation date (newest first)
- Title is required, description is optional
- Maximum title length: 200 characters
- Maximum description length: 1000 characters
