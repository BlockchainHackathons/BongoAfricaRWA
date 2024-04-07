import { ethers } from "ethers";
import { WalletDetails } from "../types/global.type";
import { provider, supremeWallet } from "../clients/ethers.client";
import {
  faucetAmountInETH,
  WXRPLUSDAddress,
} from "../constants/global.constant";
import { abiXRPLUSD } from "../constants/abis/abiToken";

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

export const fund = async (recipient: string, amount: string) => {
  const amountGwei = ethers.parseUnits(amount, 18);
  const xrplUsdContract = new ethers.Contract(
    WXRPLUSDAddress,
    abiXRPLUSD,
    supremeWallet
  );
  xrplUsdContract.transfer(recipient, amountGwei);
};
