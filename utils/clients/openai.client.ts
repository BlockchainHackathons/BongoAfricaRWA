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
        "Please extract the phone number and the amount of tokens to be sent from the following message, and format your response as follows: phoneNumber,amount. Do not include any additional information, text, or explanations in your response. For example, if the phone number is +448872637647 and the amount is 3 tokens, your response should be: +448872637647,3.",
    },
    {
      role: "user",
      content: messageUser,
    },
  ];
};
