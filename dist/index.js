"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const global_helper_1 = require("./utils/helpers/global.helper");
const supabase_helper_1 = require("./utils/helpers/supabase.helper");
const messages_constant_1 = require("./utils/constants/messages.constant");
const openai_client_1 = require("./utils/clients/openai.client");
const httpsms_helper_1 = require("./utils/helpers/httpsms.helper");
const ethers_helper_1 = require("./utils/helpers/ethers.helper");
require("dotenv").config();
const port = process.env.PORT || 6002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.post("/httpsms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log(payload.source);
    if (payload.source !== "/v1/messages/receive") {
        console.log("IN");
        return;
    }
    const phoneNumber = payload.data.contact;
    const contentMsgBrut = payload.data.content;
    const user = yield (0, supabase_helper_1.getUser)(phoneNumber);
    if (!user) {
        const newUser = (0, global_helper_1.createUser)(phoneNumber);
        const welcomeMsg = (0, messages_constant_1.getCreatedAccountMsg)(newUser.walletAddress);
        (0, httpsms_helper_1.sendMessage)(phoneNumber, welcomeMsg);
        const helpMsg = (0, messages_constant_1.getHelpMsg)();
        (0, httpsms_helper_1.sendMessage)(phoneNumber, helpMsg);
        return;
    }
    const contentMsg = `User's message: '${contentMsgBrut}'`;
    const msgOpenAI = (0, openai_client_1.getMessageOpenAI)(contentMsg);
    const response = yield openai_client_1.openaiClient.chat.completions.create({
        model: openai_client_1.modelName,
        messages: msgOpenAI,
    });
    if (!response.choices[0].message.content) {
        return;
    }
    const [actionStr, amountExtracted, phoneExtracted] = response.choices[0].message.content.split(",");
    const action = actionStr;
    if (action === "Fund") {
        (0, global_helper_1.fundWorkflow)(phoneNumber);
    }
    if (action === "Transfer") {
        const userTo = yield (0, supabase_helper_1.getUser)(phoneExtracted);
        if (!userTo) {
            return;
        }
        const privateKey = yield (0, global_helper_1.getPrivateKey)(phoneNumber);
        if (!privateKey) {
            return;
        }
        (0, ethers_helper_1.sendXRPLUsd)(privateKey, userTo.walletAddress, amountExtracted);
        const transferMessage = `You have successfully transferred ${amountExtracted} WXRP Ledger USD to ${phoneExtracted}`;
        (0, httpsms_helper_1.sendMessage)(phoneNumber, transferMessage);
    }
    // sendTx(phoneNumber, phoneNumberExacted, amountExtracted);
    // const msgRecipient = getReceivedFfundMsg(phoneNumber, amountExtracted);
    // sendMessage(phoneNumberExacted, msgRecipient);
    // const msgSent = getReceivedFfundMsg(phoneNumberExacted, amountExtracted);
    // sendMessage(phoneNumber, msgSent);
    res.send("Hello World!");
}));
app.get("/hey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const historyMsg = "User's message: 'Hi I want to know what transaction I made yesterday.'";
    const fundMsg = " User's message: 'I paid 10 dollars for a code to make money in your app, here is the code: 53GDUYDE.'";
    const withdrawMsg = " User's message: 'I want to get cash and I have 300 token I want to withdraw 200 usd from those tokens in my account'";
    const MsgTranfter = " User's message: 'I sent to money to my friend which his number is +335664774647 send him 4 tokens'";
    const msgOpenAI = (0, openai_client_1.getMessageOpenAI)(historyMsg);
    const response = yield openai_client_1.openaiClient.chat.completions.create({
        model: openai_client_1.modelName,
        messages: msgOpenAI,
    });
    console.log(response.choices[0].message);
    if (!response.choices[0].message.content) {
        return;
    }
    res.send("hello world");
}));
app.listen(port, () => console.log("Server running on port 6002"));
function main() {
    return __awaiter(this, void 0, void 0, function* () { });
}
main();
