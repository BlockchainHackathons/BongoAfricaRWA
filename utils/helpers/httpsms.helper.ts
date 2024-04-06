import { numGateway } from "../constants/global.constant";

export const sendMessage = (phoneNumber: string, content: string) => {
  fetch("https://api.httpsms.com/v1/messages/send", {
    method: "POST",
    headers: {
      "x-api-key": process.env.HTTPSMS_KEY || "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      from: numGateway,
      to: phoneNumber,
    }),
  })
    .then((res) => res.json())
    .then((data) => {});
};
