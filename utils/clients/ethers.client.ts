import { ethers } from "ethers";

require("dotenv").config();

export const secretKey = process.env.SECRET_KEY_ENCRYPTION || "";

const publicRPC = "https://rpc-evm-sidechain.xrpl.org";

export const provider = new ethers.JsonRpcProvider(publicRPC);

export const supremeWallet = new ethers.Wallet(
  process.env.PRIVATEKEY_SUPREMEWALLET || "",
  provider
);
