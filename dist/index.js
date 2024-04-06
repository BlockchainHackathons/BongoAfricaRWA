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
require("dotenv").config();
const port = process.env.PORT || 6002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.post("/httpsms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    const phoneNumber = payload.data.contact;
    const contentMsg = payload.data.content;
    const user = yield (0, supabase_helper_1.getUser)(phoneNumber);
    if (!user) {
        const newUser = (0, global_helper_1.createUser)(phoneNumber);
        const welcomeMsg = (0, messages_constant_1.getCreatedAccountMsg)(newUser.walletAddress, newUser.phoneNumber);
        (0, httpsms_helper_1.sendMessage)(phoneNumber, welcomeMsg);
        return;
    }
    const msgOpenAI = (0, openai_client_1.getMessageOpenAI)(contentMsg);
    const response = yield openai_client_1.openaiClient.chat.completions.create({
        model: openai_client_1.modelName,
        messages: msgOpenAI,
    });
    if (!response.choices[0].message.content) {
        return;
    }
    const [phoneNumberExacted, amountExtracted] = (_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.split(",");
    (0, global_helper_1.sendTx)(phoneNumber, phoneNumberExacted, amountExtracted);
    console.log("IN");
    const msgRecipient = (0, messages_constant_1.getReceivedFfundMsg)(phoneNumber, amountExtracted);
    (0, httpsms_helper_1.sendMessage)(phoneNumberExacted, msgRecipient);
    const msgSent = (0, messages_constant_1.getReceivedFfundMsg)(phoneNumberExacted, amountExtracted);
    (0, httpsms_helper_1.sendMessage)(phoneNumber, msgSent);
    res.send("Hello World!");
}));
app.listen(port, () => console.log("Server running on port 6002"));
function main() {
    return __awaiter(this, void 0, void 0, function* () { });
}
main();
