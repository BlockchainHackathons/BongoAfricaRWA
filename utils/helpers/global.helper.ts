import crypto from "crypto";
import { EncryptedData, User } from "../types/global.type";
import { createWallet, faucet, send } from "./ethers.helper";
import { getUser, insertNewUser } from "./supabase.helper";
import { secretKey } from "../clients/ethers.client";

export const encrypt = (
  privateKey: string,
  secretKey: string
): EncryptedData => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let encrypted = cipher.update(privateKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const decrypt = (encryptedObject: EncryptedData, secretKey: string) => {
  const iv = Buffer.from(encryptedObject.iv, "hex");
  const encryptedText = Buffer.from(encryptedObject.encryptedData, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const createUser = (phoneNumber: string): User => {
  const walletDetail = createWallet();
  const ecryptedData = encrypt(walletDetail.privateKey, secretKey);
  const newUser: User = {
    walletAddress: walletDetail.walletAddress,
    phoneNumber: phoneNumber,
    encryptedData: ecryptedData,
  };
  insertNewUser(newUser);
  faucet(walletDetail.walletAddress);
  return newUser;
};

export const getPrivateKey = async (phoneNumber: string) => {
  const user = await getUser(phoneNumber);
  if (!user) {
    return;
  }

  const decryptedPrivateKey = decrypt(user.encryptedData, secretKey);
  return decryptedPrivateKey;
};

export const sendTx = async (
  phoneNumber: string,
  toNumber: string,
  value: string
) => {
  const privateKey = await getPrivateKey(phoneNumber);
  const userTo = await getUser(toNumber);

  if (!privateKey || !userTo) {
    return;
  }

  send(privateKey, userTo.walletAddress, value);
};
