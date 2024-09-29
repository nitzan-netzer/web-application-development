const RETRY_DELAY = 2000;
import mongoose from 'mongoose';

// Define connection URIs for different databases
const dbURIs = {
  usersDB: 'mongodb://localhost:27017/usersDB',
  productsDB: 'mongodb://localhost:27017/productsDB',
  transactionsDB: 'mongodb://localhost:27017/transactionsDB'
};

// Create connections
const connections = {};

Object.keys(dbURIs).forEach(dbName => {
  connections[dbName] = mongoose.createConnection(dbURIs[dbName]);
})

const mongoConnect = async () => {
    while(true){
        try{
            const connectionString = "mongodb://127.0.0.1:27017/"
            await mongoose.connect(connectionString,{
                serverSelectionTimeoutMS: 5000
            })
            console.log('Connected to MongoDB');
            break;
        }
        catch(err){
            console.error(`MongoDB connection failed. Retrying in ${RETRY_DELAY / 1000} seconds... - ${err}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
        }
    }
}

export {mongoConnect, connections} ;
