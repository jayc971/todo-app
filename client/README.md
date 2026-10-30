# TODO App - Frontend

React frontend for the TODO application built with Vite.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS (no external libraries)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Configure Environment (for production)

Create a `.env` file in the client directory:

```bash
cp .env.example .env
```

For development, you can leave `VITE_API_URL` empty (it uses the Vite proxy to the backend).

For production, set it to your deployed backend URL:

```
VITE_API_URL=https://your-backend-url.com/api
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Features

- View all TODO items
- Create new TODOs with title and optional description
- Edit existing TODOs
- Toggle TODO completion status (with optimistic updates)
- Delete TODOs (with optimistic updates)
- Visual distinction for completed tasks (strikethrough)
- Form validation with user-friendly error messages
- Loading and error state handling
- Responsive design

## Project Structure

```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── todoApi.js       # API service functions
│   ├── components/
│   │   ├── TodoForm.jsx     # Form for create/edit
│   │   ├── TodoItem.jsx     # Single todo display
│   │   └── TodoList.jsx     # List container
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── .env.example
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Deployment (Vercel/Netlify)

### Vercel

1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL` = your backend URL

### Netlify

1. Connect your GitHub repository to Netlify
2. Set the base directory to `client`
3. Build command: `npm run build`
4. Publish directory: `client/dist`
5. Add environment variable: `VITE_API_URL` = your backend URL

## Assumptions & Limitations

- Single user application (no authentication)
- Requires backend API to be running
- Designed for modern browsers (ES6+ support required)
