const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, Collection } = require("mongodb");

const app = express();
dotenv.config();
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
  connectToDb();
});

app.post("/register", async (req, res) => {
  const isInserted = await insertUser(req.body);
  if (isInserted) {
    res.status(201).send("User created");
    return;
  }
  res.status(500).send("Couldn't insert to DB");
  return;
});

app.get("/users", async (req, res) => {
  const usersData = await getDataFromCollection();
  res.send(usersData);
  return;
});

app.post("/login", (req, res) => {
  console.log(req.body);
});
const client = new MongoClient(URL);

const connectToDb = async () => {
  try {
    await client.connect();
    console.log("Connection successfull");
  } catch (err) {
    console.error(`Could not connect to DB: ${err}`);
  }
};

const getDatabaseList = async () => {
  try {
    const dbList = await client.db("users").admin().listDatabases();
    console.log(dbList.databases);
  } catch (err) {
    console.log(`Couldn't connect to database ${err}`);
  }
};
const getCollections = async () => {
  try {
    const collections = client.db("users").listCollections();
    collections.forEach((collection) => {
      console.log(collection);
    });

    console.log(collections);
  } catch (err) {
    console.log(`Couldn't find collection ${err}`);
  }
};

const getDataFromCollection = async () => {
  try {
    const usersData = client.db("users").collection("users").find();
    return await usersData.toArray();
  } catch (err) {
    console.log(`Error fetching data: ${err}`);
  }
};

const insertUser = async (user) => {
  try {
    const res = await client.db("users").collection("users").insertOne(user);
    return res.acknowledged;
  } catch (err) {
    console.log(err);
    return false;
  }
};
