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
        "Analyze the user's message and categorize the intended action. Reply with a single word representing the action ('Fund', 'Transfer', 'History', 'Withdraw', or 'null') followed by a comma and the amount (if applicable) without any spaces followed by a comma and the phoneNumber (if applicable) without any spaces. Use 'null' if the action doesn't fit any categories. Expected Response Format: Action,Amount,PhoneNumber. Note: Your response should strictly be in the format specified with no additional explanations, summaries, or characters beyond the required format",
    },
    {
      role: "user",
      content: messageUser,
    },
  ];
};
