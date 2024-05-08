const express = require("express");
const cors = require('cors');
const fs = require('fs');
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const usersFilePath = './assets/users.json';

app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory JSON data store to store usersData
let usersData = [{
  "date" : "2024-05-08",
  "name": "Sameer Mohammad"
}];
try {
  const usersFileContent = fs.readFileSync(usersFilePath, 'utf8');
  usersData = JSON.parse(usersFileContent);
} catch (err) {
  console.error('Error reading users file:', err);
}

// Route to get all user data
app.get('/users', (req, res) => {
    res.json(usersData);
  });

  // Route to add a new user
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     usersData.push(newUser);
//     res.json({ message: 'User added successfully', user: newUser });
//   });
app.post('/users', (req, res) => {
  const newUser = req.body;
  usersData.push(newUser);
  // usersData = req.body;
  fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), (err) => {
    if (err) {
      console.error('Error writing users file:', err);
      res.status(500).json({ error: 'Internal Server Error with fs' });
    } else {
      res.json({ message: 'User data updated successfully' });
    }
  });
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

  module.exports = app;