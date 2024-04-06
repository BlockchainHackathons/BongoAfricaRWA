import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PayloadHttpSms } from "./utils/types/global.type";
import { createUser, sendTx } from "./utils/helpers/global.helper";
import { getUser } from "./utils/helpers/supabase.helper";
import { getCreatedAccountMsg } from "./utils/constants/messages.constant";
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
    const newUser = createUser(phoneNumber);
    const welcomeMsg = getCreatedAccountMsg(
      newUser.walletAddress,
      newUser.phoneNumber
    );
    res.send(welcomeMsg);

    return;
  }

  sendTx(phoneNumber, "+337663996549", "1.0");

  res.send("Hello World!");
});

app.listen(port, () => console.log("Server running on port 6002"));

async function main() {}

main();
