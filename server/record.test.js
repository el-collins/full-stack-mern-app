import request from "supertest";
import express from "express";
import router from "../routes/record.js";

const app = express();
app.use(express.json());
app.use("/records", router);

describe("Record Routes", () => {
  it("should get all records", async () => {
    const response = await request(app).get("/records");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should get a single record by id", async () => {
    const response = await request(app).get("/records/:id");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should return 'Not found' if record not found", async () => {
    const response = await request(app).get("/records/nonexistent-id");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not found");
  });

  it("should create a new record", async () => {
    const response = await request(app)
      .post("/records")
      .send({ name: "John Doe", position: "Developer", level: "Senior" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should update a record", async () => {
    const response = await request(app)
      .patch("/records/:id")
      .send({ name: "John Doe", position: "Developer", level: "Senior" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should delete a record", async () => {
    const response = await request(app).delete("/records/:id");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });
});