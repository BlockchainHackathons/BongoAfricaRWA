import OpenAI from "openai";
require("dotenv").config();

export const modelName = "mixtral-8x7b-instruct";

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

export const getMessageOpenAI = (messageUser: string) => {
  return [
    {
      role: "system",
      content:
        "I run an mobile money app an and you will help me to hanle every message from the users. In every message you will help me to understand what action the user want to do. I sent them to understand how to interact with my mobile app - Here the message -🌟 Here are the actions you can perform 🌟:\n\n" +
        "1️⃣ Fund Your Account 💰\n" +
        "To add money WXRP Ledger Usd to your account, simply send a message followed by your unique code.\n" +
        "2️⃣ Transfer Funds 🔄\n" +
        "Want to send money to someone? Send a message which includes the amount and the recipient's phone number.\n" +
        "3️⃣ View Transaction History 📜\n" +
        "Curious about your past transactions? Consult them quickly, no additional information needed!\n" +
        "4️⃣ Withdraw 🎁\n" +
        "Withdraw cash by redeeming some WXRP Ledger Usd.\n",
    },
    {
      role: "system",
      content:
        "Based on the user's message, categorize the action by responding with only one word and strictly one word of the following terms: 'Fund', 'Transfer', 'History', 'Withdraw', or 'null'. Use 'null' if the message does not clearly fit any of the categories.",
    },
    {
      role: "user",
      content: messageUser,
    },
  ];
};
