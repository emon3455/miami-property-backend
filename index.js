const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Address = require("./models/Address");
const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(cors());

app.post("/findAddress", async (req, res) => {
  const addressesToMatch = req.body.address;
  console.log("Addresses:", addressesToMatch);

  try {
    const results = await Promise.all(addressesToMatch.map(async (address, index) => {
      const matchedItem = await Address.findOne({
        physicalAddress: { $regex: new RegExp(`^${address}$`, 'i') }
      }).exec();
      
      return {
        index: index + 1,
        matchedItem: matchedItem
      };
    }));

    const filteredResults = results.filter(result => result.matchedItem !== null);

    res.send(filteredResults);
  } catch (err) {
    console.error("Error finding addresses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;