import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
const {MongoClient}= require("mongodb")
const uri = require("./atlas_uri")
console.log(uri)
const client = new MongoClient(uri)
const dbName = "fitfit";
const connectToDatabase=async() =>{
  try{
    await client.connect();
  }
}
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fitness-tracker')
  .then(() => console.log('MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});