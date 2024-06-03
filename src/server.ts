import express from "express";
import "dotenv/config";
import { router } from "./routes";
import { appErrors } from "./errors/appErrors";
import { pageNotFoundError } from "./errors/pageNotFoundError";
import { sqliteConnection } from "./databases/sqlite3";
import { runMigrations } from "./databases/sqlite3/migrations";
import cookieParser from "cookie-parser"
import cors from "cors" 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

const whiteList = [ 
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]

app.use(cors({
  origin:whiteList,
  credentials: true
}))

app.use(router);

app.use(pageNotFoundError);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

sqliteConnection()
  .then(() => {
    console.log("Database is connected...");
  })
  .catch((error) => {
    console.error("Database is not connected - ", error);
  });

runMigrations();
