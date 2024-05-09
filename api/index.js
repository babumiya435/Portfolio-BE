const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const databaseUrl = 'https://portfolio-db-6166d-default-rtdb.firebaseio.com/users.json';

app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a route to handle GET requests to Firebase
app.get('/users', (req, res) => {
  // Firebase Realtime Database URL
  // const databaseUrl = 'https://portfolio-db-6166d-default-rtdb.firebaseio.com/users.json';

  // Make a GET request to Firebase
  axios.get(databaseUrl)
    .then(response => {
      // Send the Firebase data as the response
      res.json(response.data);
    })
    .catch(error => {
      // Send an error response if the request to Firebase fails
      res.status(500).json({ error: 'Failed to fetch data from Firebase' });
    });
});

// POST endpoint to write data to Firebase
app.post('/users', (req, res) => {
  // Firebase Realtime Database URL
  // const databaseUrl = 'https://<your-project-id>.firebaseio.com/<collection>.json';

  // Data to be written to Firebase
  const postData = req.body;

  // Make a POST request to Firebase
  axios.post(databaseUrl, postData)
    .then(response => {
      console.log('Data written to Firebase successfully');
      res.send('Data written to Firebase successfully');
    })
    .catch(error => {
      console.error('Error writing data to Firebase:', error);
      res.status(500).send('Error writing data to Firebase');
    });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
