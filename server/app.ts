import express from "express";
import { db } from "./prisma/db";
import cors from "cors";


const app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);

app.listen(port, () => {
  console.log(`PokeTracker server listening on port ${port}`);
});