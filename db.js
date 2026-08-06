const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://lakshit031:Lakshit031@cluster0.r7muefb.mongodb.net/myProject?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log("Connected Successfully");

    const db = client.db("myProject");

    console.log(db.databaseName);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

main();