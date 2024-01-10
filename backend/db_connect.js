const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://aks19802003:UEc3VSR1ebiPHbAJ@carbuy.6hj9qvf.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

module.exports = { connectToDatabase, closeDatabaseConnection, client };

