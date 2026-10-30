const mongoose = require('mongoose');
require('dotenv').config();
const Todo = require('./models/Todo');

const seedData = [
  // To Do
  { title: 'Research project requirements', description: 'Gather all necessary documentation', status: 'todo', done: false },
  { title: 'Design database schema', description: 'Plan MongoDB collections and relationships', status: 'todo', done: false },
  { title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for deployment', status: 'todo', done: false },

  // In Progress
  { title: 'Implement user authentication', description: 'Add JWT-based login system', status: 'inprogress', done: false },
  { title: 'Build REST API endpoints', description: 'Create CRUD operations for todos', status: 'inprogress', done: false },
  { title: 'Write unit tests', description: 'Add Jest tests for components', status: 'inprogress', done: false },

  // Done
  { title: 'Initialize project structure', description: 'Set up React and Express boilerplate', status: 'done', done: true },
  { title: 'Configure MongoDB connection', description: 'Set up Mongoose and Atlas', status: 'done', done: true },
  { title: 'Install dependencies', description: 'Add all required npm packages', status: 'done', done: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing todos
    await Todo.deleteMany({});
    console.log('Cleared existing todos');

    // Insert seed data
    await Todo.insertMany(seedData);
    console.log('Inserted 9 seed todos (3 per status)');

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seed();
