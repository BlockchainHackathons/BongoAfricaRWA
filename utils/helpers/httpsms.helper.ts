import { httpSmsClient } from "../clients/httpsms.client";

export const sendMessage = (phoneNumber: string, content: "") => {
  httpSmsClient.messages.postSend({
    content: content,
    from: "+33733333333",
    to: phoneNumber,
    encrypted: false,
  });
};
