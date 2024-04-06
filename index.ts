import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PayloadHttpSms } from "./utils/types/global.type";
import { createUser } from "./utils/helpers/global.helper";
import { getUser } from "./utils/helpers/supabase.helper";
require("dotenv").config();

const port = process.env.PORT || 6002;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/httpsms", async (req, res) => {
  const payload: PayloadHttpSms = req.body;
  const phoneNumber = payload.data.contact;

  const user = await getUser(phoneNumber);
  if (!user) {
    createUser(phoneNumber);
  }

  res.send("Hello World!");
});

app.listen(port, () => console.log("Server running on port 6002"));

async function main() {}

main();
