import express, { Express, Request, Response } from "express";
require("dotenv").config();

const port = process.env.PORT || 6002;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log("Server running on port 6002"));

async function main() {}

main();
