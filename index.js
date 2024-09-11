const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const data = require('./data');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Ensure this is applied before your routes

// Endpoint to find addresses
app.post('/findAddress', (req, res) => {
  const addressesToMatch = req.body.address;
  console.log('Addresses:', addressesToMatch);

  const results = addressesToMatch.map((address, index) => {
    const matchedItem = data.find(item => item.physicalAddress.toUpperCase() === address.toUpperCase());
    return {
      index: index + 1,
      matchedItem: matchedItem,
    };
  }).filter(result => result.matchedItem !== undefined);

  res.send(results);
});

app.get('/', (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
