import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    depreciationErrors: true,
  },
});

try {
    // connect the client to the server
    await client.connect();
    console.log("Connected to the server");
    // send a ping to confirm a successfull connection 
    await client.db("admin").command({ ping: 1 });
    console.log("Ping sent");   
} catch (error) {
    console.log("Error connecting to the server", error);
}

let db = client.db("employees")

export default db;