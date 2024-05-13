import express from "express";
import cors from "cors";
import router from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/records", router); //localhost:5050/records/ (for all records)



// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
