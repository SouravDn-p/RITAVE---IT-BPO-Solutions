import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB URI
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.npxrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.mw9nz2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;




// MongoDB client setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
