import { ethers } from "ethers";
import { WalletDetails } from "../types/global.type";

export const createWallet = (): WalletDetails => {
  const newWallet = ethers.Wallet.createRandom();

  return {
    walletAddress: newWallet.address,
    privateKey: newWallet.privateKey,
  };
};
