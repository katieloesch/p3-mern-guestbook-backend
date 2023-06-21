const { MongoClient, ServerApiVersion } = require('mongodb');

// const localDB = 'mongodb://localhost:27017/divorce'
const uri = 'mongodb+srv://hpramanathan:D1v0rc3App@chewingthecrud.eue601v.mongodb.net/?retryWrites=true&w=majority'

// Can change 'uri' to 'localDB' if we want to connect to local DB instead
const currentDB = process.env.MONGODB_URI || uri

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

//Export the appropriate database based on the current enviroment

module.exports = currentDB