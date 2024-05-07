const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory JSON data store
let usersData = [];

// Route to get all user data
app.get('/users', (req, res) => {
    res.json(usersData);
  });

  // Route to add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    usersData.push(newUser);
    res.json({ message: 'User added successfully', user: newUser });
  });

  // Route to update a user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    usersData = usersData.map(user => {
      if (user.id === userId) {
        return { ...user, ...updatedUserData };
      } else {
        return user;
      }
    });
  
    res.json({ message: 'User updated successfully', userId: userId });
  });

  // Route to delete a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    usersData = usersData.filter(user => user.id !== userId);
  
    res.json({ message: 'User deleted successfully', userId: userId });
  });

  // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });