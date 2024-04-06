import HttpSms from "httpsms";

require("dotenv").config();

export const httpSmsClient = new HttpSms(process.env.HTTPSMS_KEY || "");
