import { ethers } from "ethers";
import { WalletDetails } from "../types/global.type";
import { supremeWallet } from "../clients/ethers.client";
import { faucetAmountInETH } from "../constants/global.constant";

export const createWallet = (): WalletDetails => {
  const newWallet = ethers.Wallet.createRandom();

  return {
    walletAddress: newWallet.address,
    privateKey: newWallet.privateKey,
  };
};

export const faucet = async (_to: string) => {
  supremeWallet.sendTransaction({
    to: _to,
    value: ethers.parseEther(faucetAmountInETH),
  });
};
