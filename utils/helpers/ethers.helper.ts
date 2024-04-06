import { ethers } from "ethers";
import { WalletDetails } from "../types/global.type";
import { provider, supremeWallet } from "../clients/ethers.client";
import { faucetAmountInETH } from "../constants/global.constant";

export const createWallet = (): WalletDetails => {
  const newWallet = ethers.Wallet.createRandom();

  return {
    walletAddress: newWallet.address,
    privateKey: newWallet.privateKey,
  };
};

export const faucet = async (to: string) => {
  supremeWallet.sendTransaction({
    to: to,
    value: ethers.parseEther(faucetAmountInETH),
  });
};

export const send = async (privateKey: string, to: string, value: string) => {
  const wallet = new ethers.Wallet(privateKey, provider);
  wallet
    .sendTransaction({
      to: to,
      value: ethers.parseEther(value),
    })
    .then(() => {
      console.log("Sending value", value, " to", to);
    });
};
