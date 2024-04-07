import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Action, PayloadHttpSms } from "./utils/types/global.type";
import {
  createUser,
  fundWorkflow,
  sendTx,
} from "./utils/helpers/global.helper";
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
  const contentMsgBrut = payload.data.content;

  const user = await getUser(phoneNumber);
  if (!user) {
    const newUser = createUser(phoneNumber);
    const welcomeMsg = getCreatedAccountMsg(newUser.walletAddress);
    sendMessage(phoneNumber, welcomeMsg);
    const helpMsg = getHelpMsg();
    sendMessage(phoneNumber, helpMsg);

    return;
  }
  const contentMsg = `User's message: '${contentMsgBrut}'`;

  const msgOpenAI = getMessageOpenAI(contentMsg);

  const response = await openaiClient.chat.completions.create({
    model: modelName,
    messages: msgOpenAI as never,
  });

  if (!response.choices[0].message.content) {
    return;
  }

  const [actionStr, amountExtracted]: string[] =
    response.choices[0].message.content.split(",") as any;

  const action = actionStr as Action;

  if (action === "Fund") {
    fundWorkflow(phoneNumber);
  }

  // sendTx(phoneNumber, phoneNumberExacted, amountExtracted);

  // const msgRecipient = getReceivedFfundMsg(phoneNumber, amountExtracted);
  // sendMessage(phoneNumberExacted, msgRecipient);
  // const msgSent = getReceivedFfundMsg(phoneNumberExacted, amountExtracted);
  // sendMessage(phoneNumber, msgSent);

  res.send("Hello World!");
});

app.get("/hey", async (req, res) => {
  const historyMsg =
    "User's message: 'Hi I want to know what transaction I made yesterday.'";
  const fundMsg =
    " User's message: 'I paid 10 dollars for a code to make money in your app, here is the code: 53GDUYDE.'";
  const withdrawMsg =
    " User's message: 'I want to get cash and I have 300 token I want to withdraw 200 usd from those tokens in my account'";
  const MsgTranfter =
    " User's message: 'I sent to money to my friend which his number is +335664774647 send him 4 tokens'";
  const msgOpenAI = getMessageOpenAI(fundMsg);

  const response = await openaiClient.chat.completions.create({
    model: modelName,
    messages: msgOpenAI as never,
  });

  console.log(response.choices[0].message);

  if (!response.choices[0].message.content) {
    return;
  }

  res.send("hello world");
});
app.listen(port, () => console.log("Server running on port 6002"));

async function main() {}

main();
