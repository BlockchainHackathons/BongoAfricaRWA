export const getCreatedAccountMsg = (walletAddress: string) => {
  return `
    We're thrilled to welcome you to BongoCash! 🥳 Congratulations! Your new wallet address on the side chain is: ${walletAddress}.

    To get you started, we've credited your account with a complimentary faucet of **10 XRP tokens**.
`;
};

export const getReceivedFfundMsg = (amount: string, phoneNumber: string) => {
  return `You received ${amount} tokens from ${phoneNumber}.`;
};

export const getSentFundMsg = (amount: string, phoneNumber: string) => {
  return `You have sent ${amount} tokens to ${phoneNumber}.`;
};
