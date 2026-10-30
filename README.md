# TODO App

A full-stack TODO application built with React and Express.js.

## Overview

This application allows users to manage their TODO items with full CRUD functionality:

- **Create** new TODOs with title and optional description
- **Read** and view all TODO items
- **Update** TODO details (title/description)
- **Toggle** completion status
- **Delete** TODO items

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB with Mongoose |

## Project Structure

```
todo-app/
├── client/          # React frontend
│   ├── src/
│   ├── package.json
│   └── README.md
├── server/          # Express backend
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md        # This file
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### 3. Setup Frontend (in a new terminal)

```bash
cd client
npm install
npm run dev
```

### 4. Open the App

Visit `http://localhost:3000` in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all TODO items |
| POST | `/api/todos` | Create a new TODO |
| PUT | `/api/todos/:id` | Update a TODO |
| PATCH | `/api/todos/:id/done` | Toggle done status |
| DELETE | `/api/todos/:id` | Delete a TODO |

## Deployment

### Backend (Render/Railway)

1. Create a new web service
2. Connect your GitHub repository
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable: `MONGODB_URI`

### Frontend (Vercel/Netlify)

1. Connect your GitHub repository
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL` = backend URL

## Features

- Clean and responsive UI
- Form validation
- Optimistic UI updates for better UX
- Error handling with user-friendly messages
- Loading states
- Visual distinction for completed tasks

## Author

Jayanika

## License

ISC
