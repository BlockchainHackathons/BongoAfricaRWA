import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PayloadHttpSms } from "./utils/types/global.type";
import { createUser, sendTx } from "./utils/helpers/global.helper";
import { getUser } from "./utils/helpers/supabase.helper";
import {
  getCreatedAccountMsg,
  getHelpMsg,
  getReceivedFfundMsg,
} from "./utils/constants/messages.constant";
import {
  getMessageOpenAI,
  modelName,
  openaiClient,
} from "./utils/clients/openai.client";
import { sendMessage } from "./utils/helpers/httpsms.helper";
import { fund } from "./utils/helpers/ethers.helper";
require("dotenv").config();

const port = process.env.PORT || 6002;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/httpsms", async (req, res) => {
  const payload: PayloadHttpSms = req.body;
  console.log(payload.source);
  if (payload.source !== "/v1/messages/receive") {
    console.log("IN");
    return;
  }
  const phoneNumber = payload.data.contact;
  const contentMsg = payload.data.content;

  const user = await getUser(phoneNumber);
  if (!user) {
    const newUser = createUser(phoneNumber);
    const welcomeMsg = getCreatedAccountMsg(newUser.walletAddress);
    sendMessage(phoneNumber, welcomeMsg);
    const helpMsg = getHelpMsg();
    sendMessage(phoneNumber, helpMsg);

    return;
  }
  const msgOpenAI = getMessageOpenAI(contentMsg);

  const response = await openaiClient.chat.completions.create({
    model: modelName,
    messages: msgOpenAI as never,
  });
  if (!response.choices[0].message.content) {
    return;
  }
  const [phoneNumberExacted, amountExtracted]: string[] =
    response.choices[0].message.content.split(",") as any;

  console.log(response.choices[0].message.content);

  sendTx(phoneNumber, phoneNumberExacted, amountExtracted);

  const msgRecipient = getReceivedFfundMsg(phoneNumber, amountExtracted);
  sendMessage(phoneNumberExacted, msgRecipient);
  const msgSent = getReceivedFfundMsg(phoneNumberExacted, amountExtracted);
  sendMessage(phoneNumber, msgSent);

  res.send("Hello World!");
});

app.get("/hey", async (req, res) => {
  res.send("hello world");
});
app.listen(port, () => console.log("Server running on port 6002"));

async function main() {}

main();
