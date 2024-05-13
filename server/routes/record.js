import express from "express";

import db from "../db/connection.js";
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We will use it to define our routes.
// Each route will be related to specific URLs.
// For example, if we want to get all records, we will use the URL /records.
// If we want to get a single record, we will use the URL /records/:id.
// The :id is a placeholder for the record id.
// We will use this to get a single record by its id.
// The router will help us define these routes.
const router = express.Router();

// This section will hel get a list of all the records
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let result = await collection.findOne({ _id: ObjectId(req.params.id) });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help create a new record
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201);
  } catch (error) {
    console.log(error);
    res.send("Error adding record").status(500);
  }
});
// This section will help update a record
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    let collection = await db.collection("records");
    let result = await collection.updateOne(query, update);
    res.send(result).status(200);
  } catch (error) {
    console.log(error);
    res.send("Error updating record").status(500);
  }
});

// This section will help delete a record
router.delete("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
  res.send(result).status(200);
});

export default router;